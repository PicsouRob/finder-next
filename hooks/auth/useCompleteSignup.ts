import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/types/model";
import { useToast } from "../use-toast";
import { completedSignupSchema, CompletedSignupSchemaType } from "@/types/form";
import { addImageToStorage, deleteImageFromStorage } from "@/libs/firebaseActions";

export const useCompleteSignup = () => { 
    const router: AppRouterInstance = useRouter();
    const [avatar, setAvatar] = useState<string>("");
    const [userData, setUserData] = useState<User>();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`/api/auth/user?id=${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", },
            });

            const { user } = JSON.parse(await response.json());
            setUserData(user);
        }

        getUserData();
    }, [id, userData]);

    const form = useForm<CompletedSignupSchemaType>({
        resolver: zodResolver(completedSignupSchema),
        defaultValues: {
            type: '',
            position: '',
            location: '',
            avatar: '',
            phoneNumber: '',
            description: '',
        },
    });
    
    useEffect(() => {
        if(!id) {
            router.back();
        }
    }, [id, router]);

    const handleAvatar = () => {
        if (fileRef?.current) {
            fileRef.current.click();
        }
    };

    const addAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !file.type.startsWith('image/')) {
            console.error("Le fichier n'est pas une image.");
            
            return;
        }

        const fileUrl = await addImageToStorage(file);
        setAvatar(fileUrl!);
        form.setValue("avatar", fileUrl!);
    }
    
    const handleSubmitForm = async (values: CompletedSignupSchemaType) => {
        setError("");
        setIsLoading(true);

        try {
            const userNewData = {
                ...userData,
                phoneNumber: values.phoneNumber,
                description: values.description,
                type: values.type,
                position: values.position,
                location: values.location,
                avatar: values.avatar,
            };

            const response = await fetch("/api/update/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(userNewData)
            });
            
            const user = JSON.parse(await response.json());
            
            if(response.ok) {
                toast({
                    title: "Comppleter Profil",
                    description: "Votre profil a été complété avec succès.",
                    duration: 2
                });
            
                router.push("/signin");
            } else {
                setError(`${user?.message}`);
            }
            
            setIsLoading(false);
        } catch(error: any) {
            setIsLoading(false);
            setError(`${error}`);
        }
    };

    const keyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter" && formRef?.current) {
            form.handleSubmit(handleSubmitForm);
        }
    }, [form]);

    useEffect(() => {
        document.addEventListener("keypress", keyPress);
        return () => document.removeEventListener('keypress', keyPress);
    }, [keyPress]);

    const deleteAvatar = async () => { 
        await deleteImageFromStorage(avatar);
        form.setValue("avatar", "");
        setAvatar("");
    }

    return {
        form,
        handleAvatar,
        addAvatar,
        handleSubmitForm,
        deleteAvatar,
        isLoading,
        error,
        avatar,
        userData,
        fileRef
    };
}