import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { JobReview } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const {
            id, jobId, comment, createdByUserId, dateUpdated, dateCreated
        } = (await request.json()) as JobReview;

        if (!id || !comment || !createdByUserId || !jobId || !dateCreated || !dateUpdated) {
            throw new Error(`Toutes les champs sont obligatoires.`);
        }

        const jobReview = await prisma.jobReview.findUnique({
            where: { id }
        }) as JobReview;

        if(!jobReview) {
            throw new Error(`Aucune commentaire de travail appartient a cette identifiant: ${id}`);
        }

        await prisma.jobReview.update({
            where: { id },
            data: { comment, dateUpdated }
        });

        return NextResponse.json(JSON.stringify({
            message: "Commentaire actualisé avec succes."
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