import { useSession } from "next-auth/react";

export const useUserSession = () => {
    const { data: session, status } = useSession();
    let isAuthenticated: boolean = status === "authenticated";

    return { session, isAuthenticated };
}