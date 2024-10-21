import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { ProjectReview } from "@/types/model";

export async function POST(request: NextRequest) {
    try {
        const projectReview = (await request.json()) as ProjectReview;

        const existedUser = await prisma.userProject.findUnique({
            where: {
                id: projectReview.projectId,
            }
        });
        
        if (existedUser) {
            throw new Error("Il n'existe pas de projet pour cette utilisateur.");
        }

        await prisma.projectReview.create({
            data: projectReview
        });

        return NextResponse.json(JSON.stringify({
            message: "Commentaire et qualification créer avec succes pour ce projet.",
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