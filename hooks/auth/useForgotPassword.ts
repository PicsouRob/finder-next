import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import { useToast } from "../use-toast";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/types/form";

export const useForgotPassword = () => { 
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const [isResetLinkSended, setIsResetLinkSended] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
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

    useEffect(() => {
        document.addEventListener('keypress', keyPress);

        return () => document.removeEventListener('keypress', keyPress);
    }, [keyPress]);
    
    const handleSubmitForm = async (values: ForgotPasswordSchemaType) => {
        try {
            setError("");
            setIsLoading(true);
            
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(values)
            });
            
            const result = JSON.parse(await response.json());
            
            if(response.ok) {
                setIsResetLinkSended(true);

                toast({
                    title: "Mot de passe oublié",
                    description: "Demande de réinitialisation envoyée avec succès.",
                    duration: 2
                });
            } else {
                setError(`${result?.message}`);
            }
            
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
            setError(`${error}`);
            setIsLoading(false);
        }
    }

    return {
        form,
        handleSubmitForm,
        isLoading,
        error,
        isResetLinkSended
    };
}