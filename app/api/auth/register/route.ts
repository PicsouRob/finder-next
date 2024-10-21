import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prisma.config";
import { getUserByEmail } from "@/actions/user";
import { User } from "@/types/model";

export async function POST(request: Request) {
    try {
        const { name, email, password } = (await request.json()) as User;

        if(!name || !email || !password) {
            throw new Error("Toutes les champs comme: E-mail, Mot de passe, Nom complet");
        }

        const existedUser = await getUserByEmail(email);

        if(existedUser) {
            throw new Error("Cette utilisateur existe deja!");
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword
            }
        }) as User;

        return NextResponse.json(JSON.stringify({
            ...user, 
            message: "Utilisateur créé avec succes."
        }), { status: 201 });
    } catch(error: any) {
        return NextResponse.json(
            JSON.stringify({
                message: error.message,
            }), {
            status: 500
        });
    }
};