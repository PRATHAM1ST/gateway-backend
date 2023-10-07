import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";
import { sha512 } from "js-sha512";
import { z } from "zod";
import jwt from "jsonwebtoken";
import ZodErrorHandler from "../../handler/ZodErrorHandler";
import sendOTP from "./otpSender";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { email, password } = req.body;

	const schema = z.object({
		email: z.string().email("Invalid email").max(255, "Email too long"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
	});

	ZodErrorHandler({ email, password }, schema);

	const hashedPassword = sha512(password);

	const user = await prisma.user.findUnique({
		where: {
			email: email,
			password: hashedPassword,
			otpVerified: true,
		},
	});

	if (!user) throw new Error("User not found");

	const token = jwt.sign(
		{ userId: user.id },
		String(process.env.JWT_SECRET),
		{
			expiresIn: "24h",
		}
	);

	res.cookie("token", token, { httpOnly: true });

	await sendOTP({ userId: user.id, email });

	return ResponseHandler.success({
		req,
		res,
		data: user,
		message: "User Found",
	});
}

export default { POST };
