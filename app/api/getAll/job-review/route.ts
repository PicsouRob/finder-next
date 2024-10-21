import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { JobReview } from "@/types/model";

export async function GET() {
    try {
        const jobReview: JobReview[] = await prisma.jobReview.findMany();

        if(jobReview.length < 1) {
            throw new Error("Il n'existe aucun commentaire pour le cette utlisateur.");
        }

        return NextResponse.json(JSON.stringify(jobReview), { status: 201 });
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