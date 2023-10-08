import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../handler/ResponseHandler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function auth(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization;
		if (!token) {
			res.clearCookie("token");
			res.status(401);
			throw Error("No token, authorization denied");
		}

		const decodedToken = jwt.verify(
			token,
			String(process.env.JWT_SECRET)
		) as { userId: string };
		const userId = decodedToken.userId;

		// check if user exists in db
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
		});

		if (!user){
			res.clearCookie("token");
			res.status(404);
			throw Error("User does not exist");
		}

		req.body.userId = userId;
		req.body.userEmail = user.email;
		next();
        
	} catch (err: any) {
		// eslint-disable-line
		return ResponseHandler.error({
			req,
			res,
			message: err.message,
		});
	}
}

export default auth;
