import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserReview } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const {
            id, comment, rating, userId, dateCreated, dateUpdated, createdByUserId
        } = (await request.json()) as UserReview;

        if (!id || !comment || !rating || !userId || !dateCreated || !dateUpdated || !createdByUserId) {
            throw new Error(`Toutes les champs sont obligatoires.`);
        }

        const userReview = await prisma.userReview.findUnique({
            where: { id }
        }) as UserReview;

        if(!userReview) {
            throw new Error(`Aucune commentaire sur un utilisateur appartient a cette identifiant: ${id}`);
        }

        await prisma.userReview.update({
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