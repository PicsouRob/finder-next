import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { User } from "@/types/model";

export async function GET() {
    try {
        const user: User[] = await prisma.user.findMany();

        if(user.length < 1) {
            throw new Error("Il n'existe aucun freelancer pour le momment.");
        }

        return NextResponse.json(JSON.stringify(user), { status: 201 });
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