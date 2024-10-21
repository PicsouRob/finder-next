import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserReview } from "@/types/model";

export async function GET() {
    try {
        const userReview: UserReview[] = await prisma.userReview.findMany();

        if(userReview.length < 1) {
            throw new Error("Il n'existe aucun qualification et commentaire pour le cette utlisateur.");
        }

        return NextResponse.json(JSON.stringify(userReview), { status: 201 });
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