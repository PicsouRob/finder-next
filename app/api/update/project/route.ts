import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { UserProject } from "@/types/model";

export async function PUT(request: NextRequest) {
    try {
        const {
            id, title, type, description, images, dateCreated, dateUpdated, createdByUserId
        } = (await request.json()) as UserProject;

        if (!id || !title || !description || !dateCreated || !dateUpdated || !createdByUserId || !type) {
            throw new Error(`Toutes les champs sont obligatoires.`);
        }

        if (images.length < 1) {
            throw new Error(`Au moins une image doit être inclue dans votre project`);
        }

        const project = await prisma.userProject.findUnique({
            where: { id }
        }) as UserProject;

        if(!project) {
            throw new Error(`Aucune projet appartient a cette identifiant: ${id}`);
        }

        await prisma.userProject.update({
            where: { id },
            data: { title, type, description, images, dateUpdated }
        });

        return NextResponse.json(JSON.stringify({
            message: "Projet actualisé avec succes."
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