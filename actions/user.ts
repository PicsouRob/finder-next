import { prisma } from "@/libs/prisma.config";
import { User } from "@/types/model";

export const getUserByEmail = async (email: string) => {
    try {
        const existedUser = await prisma.user.findUnique({
            where: { email }
        }) as User;

        return existedUser;
    } catch(error: any) {
        console.log(error.message);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const existedUser = await prisma.user.findUnique({
            where: { id }
        }) as User | null;

        return existedUser;
    } catch(error: any) {
        console.log(error.message);
        
        return null;
    }
}