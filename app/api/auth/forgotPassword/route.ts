import { NextResponse } from "next/server";

import { signJwt } from "@/libs/jsonWebToken";
import { prisma } from "@/libs/prisma.config";
import { sendMail } from "@/libs/sendMail";

export async function POST(request: Request) {
    try {
        const { email } = (await request.json()) as { email: string };
        if(!email) {
            throw new Error("L'email est obligatoire!");
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) {
            throw new Error("L'utilisateur avec cette e-mail n'existe pas!");
        }

        const jwtUserId: string = signJwt({
            id: user.id
        });

        const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/reset-password/${jwtUserId}`;

        await sendMail({
            name: user.name,
            email: user.email,
            url: resetPasswordUrl
        });

        return NextResponse.json(JSON.stringify({
            message: 'Email sent successfully',
        }), { status: 201 });
    } catch(error: any) {
        return NextResponse.json(
            JSON.stringify({
                message: error.message,
            }), {
            status: 500
        });
    }
}