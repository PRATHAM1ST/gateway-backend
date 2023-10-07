import { Request, Response } from "express";
import { PrismaClient } from "../prisma/generated/client";
import ResponseHandler from "../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../handler/ZodErrorHandler";

const prisma = new PrismaClient();

export async function POST(req: Request & { userId: string }, res: Response) {
	const { startDateTime, endDateTime } = req.body;

	const schema = z.object({
		startDateTime: z.string(),
		endDateTime: z.string(),
	});

	ZodErrorHandler({ startDateTime, endDateTime }, schema);

	let durationMinutes = String(
		(new Date(endDateTime).getTime() - new Date(startDateTime).getTime()) /
			1000 /
			60
	);

	const freeSlot = await prisma.slots.create({
		data: {
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			duration: durationMinutes,
			userId: req.userId,
		},
	});

	if (!freeSlot) throw Error("Free Slot not created");

	return ResponseHandler.success({
		req,
		res,
		data: freeSlot,
		message: "Free Slot Created",
	});
}
