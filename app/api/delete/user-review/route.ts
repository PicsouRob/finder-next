import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserReview } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const userReview = await prisma.userReview.findUnique({
            where: { id }
        }) as UserReview;

        if(!userReview) {
            throw new Error(`Aucune comentaire sur un utilisateur appartient a cette identifiant: ${id}`);
        }

        await prisma.userReview.delete({ where: { id } });

        return NextResponse.json(JSON.stringify({
            message: "Commentaire supprimé avec succes."
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