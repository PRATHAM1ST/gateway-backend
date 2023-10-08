import { Request, Response } from "express";
import { PrismaClient } from "../prisma/generated/client";
import ResponseHandler from "../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../handler/ZodErrorHandler";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { dates } = req.body;

	console.log(req.body, 'req.body');

	const schema = z.object({
		dates: z.array(
			z.object({
				startDateTime: z.string(),
				endDateTime: z.string(),
			})
		),
	});

	ZodErrorHandler({ dates }, schema);

	const durationArray = dates.map(
		(date: { startDateTime: string; endDateTime: string }) => {
			const startDateTime = new Date(date.startDateTime);
			const endDateTime = new Date(date.endDateTime);

			const duration = endDateTime.getTime() - startDateTime.getTime();

			return new Date(duration);
		}
	);

	const totalData: {
		startDateTime: Date;
		endDateTime: Date;
		duration: Date;
		userId: string;
	}[] = [];

	for (let i = 0; i < durationArray.length; i++) {
		const startDateTime = new Date(dates[i].startDateTime);
		const endDateTime = new Date(dates[i].endDateTime);

		const duration = durationArray[i];

		const data = {
			startDateTime,
			endDateTime,
			duration,
			userId: req.body.userId,
		};

		totalData.push(data);
	}

	const freeSlot = await prisma.slots.createMany({
		data: totalData,
	});

	if (!freeSlot) {
		res.status(422);
		throw Error("Free Slot not created");
	}
	return ResponseHandler.success({
		req,
		res,
		data: freeSlot,
		message: "Free Slot Created",
	});
}


export default { POST };