import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { ProjectReview } from "@/types/model";

export async function GET() {
    try {
        const projectReview: ProjectReview[] = await prisma.projectReview.findMany();

        if(projectReview.length < 1) {
            throw new Error("Il n'existe aucun projet pour cette utlisateur.");
        }

        return NextResponse.json(JSON.stringify(projectReview), { status: 201 });
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