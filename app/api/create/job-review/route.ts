import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { Job, JobReview } from "@/types/model";

export async function POST(request: NextResponse) {
    try {
        const jobReviewInfo = (await request.json()) as JobReview;

        const existedJob = await prisma.job.findUnique({
            where: {
                id: jobReviewInfo.jobId,
            }
        }) as Job;
        
        if (existedJob) {
            throw new Error("Cette travail n'existe pas, alors vous ne pouvez pas créer de commentaire.");
        }

        await prisma.jobReview.create({
            data: jobReviewInfo
        });

        return NextResponse.json(JSON.stringify({
            message: "Commentaire et qualification créer avec succes pour ce traval.",
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