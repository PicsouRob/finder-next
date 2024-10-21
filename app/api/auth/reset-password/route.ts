import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

import { verifyJwt } from "@/libs/jsonWebToken";
import { prisma } from "@/libs/prisma.config";

type ResetPasswordProps = {
    jwtUserId: string,
    password: string,
}

export async function PUT(request: Request) {
    try {
        const { jwtUserId, password } = (await request.json()) as ResetPasswordProps;
        
        if (!password) {
            throw new Error("Le mot de passe est obligatoire!");
        }

        const payload: JwtPayload | null = verifyJwt(jwtUserId);
        const userId: string = payload?.id;

        if(!userId) {
            throw new Error("Le token est expire ou invalide!");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if(!user) {
            throw new Error("L'utilisateur avec cette e-mail n'exist pas!");
        }

        await prisma.user.update({
            where: { id: userId },
            data: { password: await bcrypt.hash(password, 10)}
        });

        return NextResponse.json(JSON.stringify({
            message: 'Votre mot de passe a ete reinitialiser avec succes.',
        }), { status: 201 });
    } catch(error: any) {
        return NextResponse.json({
        message: error.message || "Une erreur interne s'est produite",
        }, { status: 500 });
    }
}