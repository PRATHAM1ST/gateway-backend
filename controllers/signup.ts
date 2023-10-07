import { Request, Response } from "express";
import { PrismaClient } from "../prisma/generated/client";
import ResponseHandler from "../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../handler/ZodErrorHandler";
import { sha512 } from "js-sha512";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { email, password, name } = req.body;

	const schema = z.object({
		email: z.string().email("Invalid email").max(255, "Email too long"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
		name: z.string().max(50, "Name too long"),
	});

	ZodErrorHandler({ email, password, name }, schema);

	const hashedPassword = sha512(password);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	});

	if (!user) throw new Error("User not created");

	const token = jwt.sign(
		{ userId: user.id },
		String(process.env.JWT_SECRET),
		{
			expiresIn: "24h",
		}
	);

	res.cookie("token", token, { httpOnly: true });

	return ResponseHandler.success({
		req,
		res,
		data: user,
		message: "User Created",
	});
}

export default { POST };
