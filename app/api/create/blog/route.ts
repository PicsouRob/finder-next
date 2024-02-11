import { getUserByEmail } from "@/actions/authUser";
import { prisma } from "@/libs/prisma.config";
import { BlogData } from "@/types/createType";
import { UserProps } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {
    try {
        const {
            email, text, title, images
        } = (await request.json()) as BlogData;

        if(!email || !text || !title || (images.length === 0)) {
            throw new Error("Toutes champs sont obligatoire.");
        }

        const existedUser: any = await getUserByEmail(email);

        if(!existedUser) {
            throw new Error("Aucune compte n'est relie a cette e-mail adresse, s'il vous plait creer un compte et revenez plutard.");
        }

        if(existedUser.role != "admin") {
            throw new Error("Seul les admins peuvent creer des blogs.");
        }

        const blog = await prisma.blog.create({
            data: {
                text, title, images, createByUserId: existedUser.id
            }
        });

        return NextResponse.json(JSON.stringify({
            ...blog,
            message: "Le blog a ete cree avec success.",
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