import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
	const { username } = req.params;

	console.log("username: ", username);

	const user = await prisma.user.findMany({
		where: {
			username: username,
		},
	});

	console.log("user: ", user);

	if (user.length) throw new Error("Username is not unique");

	return ResponseHandler.success({
		req,
		res,
		data: { username },
		message: "Username is unique",
	});
}

export default { GET };
