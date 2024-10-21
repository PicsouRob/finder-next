import { NextRequest, NextResponse } from 'next/server';

import { User } from '@/types/model';
import { prisma } from '@/libs/prisma.config';
import { getUserById } from '@/actions/user';

export async function GET(request: NextRequest) {
    try {
        const url: URL = new URL(request.url);
        const id: string = url.searchParams.get("id")!;

        if (!id) {
            throw new Error("L'identifiant est obligaatoire.");
        }

        const existedUser: User | null = await getUserById(id);

        if (!existedUser) {
            throw new Error(`Il n'existe aucun utilisateur avec cette identifiant: ${id}.`);
        }

        const { password, ...userWithoutPassword } = existedUser;

        return NextResponse.json(JSON.stringify({
            user: userWithoutPassword,
            message: "Utilisateur trouvé avec succes."
        }), {  status: 201 });
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