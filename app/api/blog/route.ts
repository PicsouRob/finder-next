import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

import { prisma } from "@/libs/prisma.config";
import { BlogData } from "@/types/createType";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id: string | null = searchParams.get('id');

        if(!id) {
            throw new Error("L'id est obligatoire.");
        }

        if((id.length > 24) || (id.length < 24)) {
            throw new Error("L'id doit contenir 24 caracteres.");
        }

        const objetId: ObjectId = new ObjectId(id);
        const foundedBlog: BlogData = await prisma.blog.findFirst({
            where: { id: objetId }
        });

        if(!foundedBlog) {
            throw new Error("Il n'existe pas de blog relie a cette id.");
        }

        return NextResponse.json(JSON.stringify(foundedBlog), { status: 201 });
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