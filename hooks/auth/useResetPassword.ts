import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import { useToast } from "../use-toast";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/types/form";
import { newVerification } from "@/actions/new-verification";

export const useResetPassword = () => { 
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const { jwt }: { jwt: string } = useParams();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExpiredToken, setIsExpiredToken] = useState<boolean>(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });
    
    const keyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter" && formRef?.current) {
            formRef.current.handleSubmit();
        }
    }, []);
    
    const verifyToken = useCallback(() => {
        if(!jwt) {
            setError("Erreur de token!");
            return;
        }
        
        newVerification(jwt).then((data) => {
            console.log({ data });
            setIsExpiredToken(data);
        })
            .catch(() => {
                console.log("Erreur");
                setError("Il s'est produit une erreur!")
                setIsExpiredToken(true);
            });
    }, [jwt]);
    
    useEffect(() => {
        verifyToken();
    }, [verifyToken]);
    
    useEffect(() => {
        if(session?.user) {
            router.push("/");
        }
    }, [session?.user, router]);

    useEffect(() => {
        document.addEventListener('keypress', keyPress);
        return () => document.removeEventListener('keypress', keyPress);
    }, [keyPress]);
    
    const handleSubmitForm = async (values: ResetPasswordSchemaType) => {
        setError("");
        setIsLoading(true);

        try {    
            const response = await fetch("/api/auth/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ ...values, jwtUserId: jwt })
            });
            
            const result = JSON.parse(await response.json());
            
            if(response.ok) {
                toast({
                    title: "Reinitialisation du mot de passe",
                    description: "Votre mot de passe a été réinitialisé avec succès.",
                    duration: 3
                });

                router.push("/signin");
                router.refresh();
            } else {
                setError(`${result?.message}`);
            }
            
            setIsLoading(false);
        } catch(error) {
            setError(`${error}`);
            setIsLoading(false);
        }
    }

    return {
        form,
        handleSubmitForm,
        isLoading,
        error,
        isExpiredToken
    };
}