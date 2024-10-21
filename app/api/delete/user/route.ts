import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { User } from "@/types/model";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id: string = searchParams.get("id")!;

        const existedUser = await prisma.user.findUnique({
            where: { id }
        }) as User;

        if(!existedUser) {
            throw new Error(`Aucune utilisateur appartient a cette identifiant: ${id}`);
        }

        await prisma.user.delete({ where: { id } });

        return NextResponse.json(JSON.stringify({
            message: "Votre compte a été supprimé avec succes."
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