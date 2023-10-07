import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			email: true,
		},
	});

	if (!users) throw Error("Users not found");

	return ResponseHandler.success({
		req,
		res,
		data: users,
		message: "Users retrieved successfully",
	});
}

export default { GET };
