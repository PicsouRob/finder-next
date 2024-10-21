import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../use-toast";
import { SignUpchemaType, signUpSchema } from "@/types/form";

export const useRegister = () => { 
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<SignUpchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    
    const keyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter" && formRef?.current) {
            formRef.current.handleSubmit();
        }
    }, []);
    
    useEffect(() => {
        if(session?.user) {
            router.push("/");
        }
    }, [session?.user, router]);
    
    const handleSubmitForm = async (values: SignUpchemaType) => {
        try {
            setError("");
            setIsLoading(true);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(values)
            });
            
            const user = JSON.parse(await response.json());
            
            if(response.ok) {
                toast({
                    title: "Connexion réussie",
                    description: "Connecter avec success.",
                    duration: 2
                });
            
                router.push(`/complete-signup?id=${user.id}`);
                router.refresh();
            } else {
                setError(`${user?.message}`);
            }
            
            setIsLoading(false);
        } catch(error: any) {
            setIsLoading(false);
            setError(`${error}`);
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', keyPress);
        return () => document.removeEventListener('keypress', keyPress);
    }, [keyPress]);

    return {
        form,
        handleSubmitForm,
        isLoading,
        error,
    };
}