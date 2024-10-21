import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { Job } from "@/types/model";

export async function GET() {
    try {
        const job: Job[] = await prisma.job.findMany();

        if(job.length < 1) {
            throw new Error("Il n'existe aucun travail pour le moment.");
        }

        return NextResponse.json(JSON.stringify(job), { status: 201 });
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