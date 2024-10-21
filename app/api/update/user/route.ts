import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { User } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const newData = (await request.json()) as User;
        const { id, ...userWithoutId } = newData;

        if (!newData.email || !newData.name) {
            throw new Error("Des champs tels que: email, nom complet sont obligatoires.");
        }

        const existedUser = await prisma.user.findUnique({
            where: { id }
        }) as User;

        if(!existedUser) {
            throw new Error(`Aucune utilisateur appartient a cette identifiant: ${id}`);
        }

        await prisma.user.update({
            where: { id },
            data: userWithoutId
        });

        return NextResponse.json(JSON.stringify({
            message: "Utilisateur actualisé avec succes."
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