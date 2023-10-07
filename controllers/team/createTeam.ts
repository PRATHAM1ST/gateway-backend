import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import ResponseHandler from "../../handler/ResponseHandler";
import { z } from "zod";
import ZodErrorHandler from "../../handler/ZodErrorHandler";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    const { name, description, userId } = req.body;

    const schema = z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
    });

    ZodErrorHandler({ name, description }, schema);

    const team = await prisma.team.create({
        data: {
            name,
            description,
            adminId: userId
        },
    });

    if (!team) throw new Error("Team not created");

    const userTeam = await prisma.teamMembership.create({
        data: {
            userId,
            teamId: team.id,
        },
    });

    if (!userTeam) throw new Error("User team not created");

    return ResponseHandler.success({
        req,
        res,
        data: team,
        message: "Team created",
    });
}

export default { POST };
