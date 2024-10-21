import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { ProjectReview } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const {
            id, comment, rating, projectId, dateCreated, dateUpdated, createdByUserId
        } = (await request.json()) as ProjectReview;

        if (!id || !comment || !rating || !projectId || !dateCreated || !dateUpdated || !createdByUserId) {
            throw new Error(`Toutes les champs sont obligatoires.`);
        }

        const projectReview = await prisma.projectReview.findUnique({
            where: { id }
        }) as ProjectReview;

        if(!projectReview) {
            throw new Error(`Aucune commentaire de projet appartient a cette identifiant: ${id}`);
        }

        await prisma.projectReview.update({
            where: { id },
            data: { comment, rating, dateUpdated }
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