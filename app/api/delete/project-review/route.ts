import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { ProjectReview } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const projectReview = await prisma.projectReview.findUnique({
            where: { id }
        }) as ProjectReview;

        if(!projectReview) {
            throw new Error(`Aucune commentaire de project appartient a cette identifiant: ${id}`);
        }

        await prisma.projectReview.delete({ where: { id } });

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