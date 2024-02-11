import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { BlogData } from "@/types/createType";

export async function GET() {
    try {
        const foundedBlogs: BlogData[] = await prisma.blog.findMany();

        if(!foundedBlogs) {
            throw new Error("Il n'existe aucun blog pour le moment.");
        }

        return NextResponse.json(JSON.stringify(foundedBlogs), { status: 201 });
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