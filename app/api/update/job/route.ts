import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { Job } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const jobInfo = (await request.json()) as Job;
        const id: string = jobInfo.id!;

        const job = await prisma.job.findUnique({
            where: { id: id }
        }) as Job;

        if(!job) {
            throw new Error(`Aucune travail appartient a cette identifiant: ${id}`);
        }

        await prisma.job.update({
            where: { id: id },
            data: jobInfo
        });

        return NextResponse.json(JSON.stringify({
            message: "Travail actualisé avec succes."
        }), { status: 201 });
    } catch(error: any) {
        console.log(error.message);
        return NextResponse.json(
            JSON.stringify({
                message: error.message,
            }), {
            status: 500
        });
    }
}