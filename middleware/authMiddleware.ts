import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../handler/ResponseHandler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) throw Error("No token, authorization denied");

        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET)) as { userId: string };
        const userId = decodedToken.userId;

        // check if user exists and is active
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) throw Error("Invalid user");
        next();
    } catch (err: any) { // eslint-disable-line
        return ResponseHandler.error({
            req,
            res,
            message: err.message,
        });
    }
}

export default auth;