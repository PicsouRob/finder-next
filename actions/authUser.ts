import { prisma } from "@/libs/prisma.config";

export const getUserByEmail = async (email: string) => {
    try {
        const existedUser = await prisma.user.findUnique({
            where: { email }
        });

        return existedUser;
    } catch(error: any) {
        console.log(error.message);
        return null;
    }
}