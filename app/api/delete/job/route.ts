import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { Job } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const job = await prisma.job.findUnique({
            where: { id }
        }) as Job;

        if(!job) {
            throw new Error(`Aucune travail appartient a cette identifiant: ${id}`);
        }

        await prisma.job.delete({ where: { id } });

        return NextResponse.json(JSON.stringify({
            message: "Travail supprimé avec succes."
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