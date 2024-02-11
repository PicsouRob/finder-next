"use client";

import React, {
    useEffect, useState, useCallback, useRef
} from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";

import SignLeft from "@/components/SignLeft";
import SignTop from '@/components/SignTop';
import SignFooter from '@/components/SignFooter';
import { AuthenticateValuesData } from '@/types/user';
import Error from '@/components/Error';
import AuthSubmitButton from '@/components/AuthSubmitButton';
import InputField from '@/components/InputField';

import person from '@/public/icons/user.svg';
import email from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';

const validation = Yup.object().shape({
    name: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string().email('Addresse email incorrect')
        .required("L'email est obligatoire"),
    password: Yup.string().min(6, 'Le mot de passe doit être au moins de 6 caractères')
        .required("Le mot de passe est obligatoire")
});

const Page: React.FC = () => {
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formRef = useRef<FormikProps<{ email: string; password: string; name: string; }> | null>(null);
    
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
    
    const handleSubmitForm = async (values: AuthenticateValuesData) => {
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
                toast.success("Votre compte a ete creer avec succes.");
            
                router.push("/signin");
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

    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <Toaster />
            <SignLeft />
            
            <div className="flex-1 m-auto w-full">
                <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                    <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
                        <div className="pb-4">
                            <SignTop title="Bienvenue!"
                                text="Connectez-vous maintenant pour gérer vos compétences en toute simplicité"
                            />
                            
                            <Formik
                                initialValues={{
                                    email: '', password: '', name: ''
                                }}
                                validationSchema={validation}
                                onSubmit={(values) => handleSubmitForm(values)}
                                innerRef={formRef}
                            >
                                {({ values, errors, handleSubmit, handleChange, touched }) => (
                                    <form onSubmit={handleSubmit} className="w-full space-y-2 text-gray-700">
                                        {error && <Error text={error} />}
                                        
                                        <InputField 
                                            name="name"
                                            type="text"
                                            label="Nom et Prenom" 
                                            value={values.name} 
                                            error={errors.name} 
                                            svg={person}
                                            errorMessage={errors.name}
                                            handleChange={handleChange}
                                            placeholder="Votre Nom et Prenom"
                                        />
                                        
                                        <InputField 
                                            name="email"
                                            type="email"
                                            label="Adresse e-mail" 
                                            value={values.email} 
                                            error={errors.email} 
                                            svg={email}
                                            errorMessage={errors.email}
                                            handleChange={handleChange}
                                            placeholder="Votre adresse e-mail"
                                        />
                                        
                                        <InputField 
                                            name="password"
                                            type="password"
                                            label="Mot de passe" 
                                            value={values.password} 
                                            error={errors.password} 
                                            svg={lock}
                                            errorMessage={errors.password}
                                            handleChange={handleChange}
                                            placeholder="Votre mot de passe"
                                        />
                                        
                                        <AuthSubmitButton text="Créer mon compte" isLoading={isLoading} />
                                    </form>
                                )}
                            </Formik>
                            
                            <div className="pt-4 pb-3">
                                <div className="font-light text-center text-gray-500 flex-wrap space-x-1 flex items-center justify-center">
                                    <div>Avez-vous déjà un compte?</div>
                                    <Link href="/signin">
                                        <span className="font-normal text-teal-500 hover:text-teal-600">
                                            Connectez-vous
                                        </span>
                                    </Link>
                                </div>
                                
                                <SignFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;