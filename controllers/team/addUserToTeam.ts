import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../../handler/ZodErrorHandler";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const { userId, teamId } = req.body;

	const schema = z.object({
		userId: z.string(),
		teamId: z.string(),
	});

	ZodErrorHandler({ userId, teamId }, schema);

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) throw new Error("User not found");

    const team = await prisma.team.findUnique({
        where: {
            id: teamId,
        },
    });

    if (!team) throw new Error("Team not found");

    const userTeam = await prisma.teamMembership.create({
        data: {
            userId,
            teamId,
        },
    });

    if (!userTeam) throw new Error("User team not created");

    return ResponseHandler.success({
        req,
        res,
        data: userTeam,
        message: "User added to team",
    });
}

export default { POST };
