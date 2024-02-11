import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { AuthenticateValuesData } from "@/types/user";
import { getUserByEmail } from "@/actions/authUser";

export async function POST(request: Request) {
    try {
        const { name, email, password } = (await request.json()) as AuthenticateValuesData;

        if(!name || !email || !password) {
            return NextResponse.json(
                JSON.stringify({
                    message: "Toutes les champs sont obligatoires!",
                }), { status: 400 }
            );
        }

        const existedUser = await getUserByEmail(email);

        if(existedUser) {
            return NextResponse.json(
                JSON.stringify({
                    message: "Cette utilisateur existe deja!",
                }), { status: 409 }
            );
        }

        const hashPassword: string = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name, email, password: hashPassword,
            }
        });

        return NextResponse.json(JSON.stringify(user), { status: 201 });
    } catch(error: any) {
        return NextResponse.json(
            JSON.stringify({
                message: error.message,
            }), {
            status: 500
        });
    }
};