import { Request, Response } from "express";
import { PrismaClient } from "../prisma/generated/client";
import ResponseHandler from "../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../handler/ZodErrorHandler";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { startDateTime, endDateTime, slotId, title, details } = req.body;

	const schema = z.object({
		startDateTime: z.string(),
		endDateTime: z.string(),
		slotId: z.string(),
		title: z.string(),
		details: z.string(),
	});

	ZodErrorHandler(
		{ startDateTime, endDateTime, slotId, title, details },
		schema
	);

	const slot = await prisma.slots.findUnique({
		where: {
			id: slotId,
		},
		select: {
			userId: true,
		},
	});

	if (!slot) throw Error("Slot not found");

	let durationMinutes = new Date(
		(new Date(endDateTime).getTime() - new Date(startDateTime).getTime()) /
			1000 /
			60
	);

	const appointment = await prisma.appointment.create({
		data: {
			title: title,
			details: details,
			startDateTime: new Date(startDateTime),
			endDateTime: new Date(endDateTime),
			duration: durationMinutes,
			appointerId: req.body.userId,
			appointeeId: slot.userId,
			occupiedSlotId: slotId,
		},
	});

	if (!appointment) throw Error("Appointment not created");

	return ResponseHandler.success({
		req,
		res,
		data: appointment,
		message: "Appointment Created",
	});
}

export default { POST };
