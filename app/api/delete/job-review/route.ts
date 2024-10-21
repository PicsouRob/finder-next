import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { JobReview } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const jobReview = await prisma.jobReview.findUnique({
            where: { id }
        }) as JobReview;

        if(!jobReview) {
            throw new Error(`Aucune commentaire sur un travail appartient a cette identifiant: ${id}`);
        }

        await prisma.jobReview.delete({ where: { id } });

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