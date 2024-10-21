import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserProject } from "@/types/model";

export async function POST(request: NextRequest) {
    try {
        const projectInfo = (await request.json()) as UserProject;

        const existedUser: any = await prisma.user.findUnique({
            where: {
                id: projectInfo.createdByUserId,
            }
        });
        
        if (existedUser) {
            throw new Error("Il n'existe aucun utilisateur pour ce project.");
        }

        await prisma.userProject.create({
            data: projectInfo
        });

        return NextResponse.json(JSON.stringify({
            message: "Projet créer avec succes",
        }), { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            JSON.stringify({
                message: error.message,
            }), {
            status: 500
        });
    }
}