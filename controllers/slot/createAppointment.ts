import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../../handler/ZodErrorHandler";
import sendAppointmentMail from "./appointmentMailSender";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { slotId, title, details } = req.body;

	const schema = z.object({
		slotId: z.string(),
		title: z.string(),
		details: z.string(),
	});

	ZodErrorHandler(
		{ slotId, title, details },
		schema
	);

	const slot = await prisma.slots.findUnique({
		where: {
			id: slotId,
		},
		select: {
			userId: true,
			endDateTime: true,
			startDateTime: true,
		},
	});

	if (!slot) throw Error("Slot not found");

	let durationMinutes = new Date(
		(new Date(slot.endDateTime).getTime() - new Date(slot.startDateTime).getTime()) /
			1000 /
			60
	);

	const appointment = await prisma.appointment.create({
		data: {
			title: title,
			details: details,
			startDateTime: slot.startDateTime,
			endDateTime: slot.endDateTime,
			duration: durationMinutes,
			appointerId: req.body.userId,
			appointeeId: slot.userId,
			occupiedSlotId: slotId,
		},
	});

	const getApointeeData = await prisma.user.findUnique({
		where: {
			id: slot.userId,
		},
	});

	if (!getApointeeData) throw Error("Slot owner not found");

	if (!appointment) throw Error("Appointment not created");

	console.log('appointment: ', slot.startDateTime);

	// send mail to user / guest
	await sendAppointmentMail({
		email: req.body.userEmail,
		title: title,
		details: details,
		timeFrom: String(slot.startDateTime),
		timeTo: String(slot.endDateTime),
		appointmentId: appointment.id,
	})

	// send mail to slot owner
	await sendAppointmentMail({
		email: getApointeeData.email,
		title: title,
		details: details,
		timeFrom: String(slot.startDateTime),
		timeTo: String(slot.endDateTime),
		appointmentId: appointment.id,
	})

	return ResponseHandler.success({
		req,
		res,
		data: appointment,
		message: "Appointment Created",
	});
}

export default { POST };
