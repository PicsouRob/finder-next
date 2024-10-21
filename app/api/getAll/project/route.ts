import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserProject } from "@/types/model";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const createdByUserId: string = searchParams.get("userId")!;

        const project: UserProject[] = await prisma.userProject.findMany({
            where: { createdByUserId }
        });

        if(project.length < 1) {
            throw new Error("Cette utlisateur n'a aucun projet pour l'instant.");
        }

        return NextResponse.json(JSON.stringify(project), { status: 201 });
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