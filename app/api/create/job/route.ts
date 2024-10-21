import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { Job } from "@/types/model";

export async function POST(request: NextResponse) {
    try {
        const jobInfo = (await request.json()) as Job;

        const existedUser: any = await prisma.user.findUnique({
            where: {
                id: jobInfo.createdByUserId,
            }
        });
        
        if (existedUser) {
            throw new Error("Vous êtes pas eleigible pour créer un travail, veillez créer un compte pou realizer cette action.");
        }

        await prisma.job.create({
            data: jobInfo
        });

        return NextResponse.json(JSON.stringify({
            message: "Travail créé avec succes",
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