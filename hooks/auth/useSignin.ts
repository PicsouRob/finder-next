import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../use-toast";
import { signinSchema, SignInSchemaType } from "@/types/form";
import { signIn, useSession } from "next-auth/react";

export const useSignin = () => { 
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<SignInSchemaType>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
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

    useEffect(() => {
        document.addEventListener('keypress', keyPress);
        return () => document.removeEventListener('keypress', keyPress);
    }, [keyPress]);
    
    const handleSubmitForm = async (values: SignInSchemaType) => {
        try {
            setError("");
            setIsLoading(true);

            const login = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if(login?.ok) {
                toast({
                    title: "Connexion réussie",
                    description: "Connecter avec success.",
                    duration: 2
                });

                router.push("/");
                router.refresh();
            } else {
                setError(`${login?.error}`);
            }
            
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            setError("Il s'est passe une erreur!, reessayer encore svp!");
        }
    }

    return {
        form,
        handleSubmitForm,
        isLoading,
        error,
    };
}

