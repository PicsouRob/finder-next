import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserProject } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const project = await prisma.userProject.findUnique({
            where: { id }
        }) as UserProject;

        if(!project) {
            throw new Error(`Aucune projet appartient a cette identifiant: ${id}`);
        }

        await prisma.userProject.delete({ where: { id } });

        return NextResponse.json(JSON.stringify({
            message: "Projet supprimé avec succes."
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