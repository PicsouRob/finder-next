import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserReview } from "@/types/model";

export async function POST(request: NextResponse) {
    try {
        const review = (await request.json()) as UserReview;

        const existedUser = await prisma.user.findUnique({
            where: {
                id: review.userId,
            }
        });
        
        if (existedUser) {
            throw new Error("Cette utilisateur n'existe pas, vous ne pouvez ajouter des comment pour cette raison.");
        }

        await prisma.userReview.create({
            data: review
        });

        return NextResponse.json(JSON.stringify({
            message: "Commentaire créer avec succes.",
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