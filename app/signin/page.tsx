"use client";

import React, {
    useEffect, useState, useCallback, useRef
} from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSession } from "next-auth/react";

import SignLeft from "@/components/SignLeft";
import SignTop from '@/components/SignTop';
import SignFooter from '@/components/SignFooter';
import { SignInData } from '@/types/user';
import Error from '@/components/Error';
import AuthSubmitButton from '@/components/AuthSubmitButton';
import InputField from '@/components/InputField';

import email from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';

const validation = Yup.object().shape({
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
    const formRef = useRef<FormikProps<{ email: string; password: string; }> | null>(null);
    
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
    
    const handleSubmitForm = async (values: SignInData) => {
        try {
            setError("");
            setIsLoading(true);
            const login = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if(login?.ok) {
                toast.success("Connecter avec success.", { duration: 2 });

                router.refresh();
                router.push("/");
            } else {
                setError(`${login?.error}`);
            }
            
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            setError("Il s'est passe une erreur!, reessayer encore svp!");
        }
    }

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
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validation}
                                onSubmit={(values) => handleSubmitForm(values)}
                                innerRef={formRef}
                            >
                                {({ values, errors, handleSubmit, handleChange, touched }) => (
                                    <form onSubmit={handleSubmit} className="w-full space-y-2 text-gray-700">
                                        {error && <Error text={error} />}
                                        <InputField 
                                            name="email"
                                            type="text"
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
                                        
                                        <div className="flex justify-between items-center pt-3">
                                            <div className="flex items-center">
                                                <input type="checkbox" name="remember"
                                                    className="w-5 h-5 text-orange-50 bg-white rounded border border-gray-400 focus:outline-none focus:ring-primary focus:ring-1 focus:bg-primary self-center"
                                                />
                                                <label htmlFor="remember" className="pl-2 text-primary  text-sm">
                                                    Souviens-toi de moi
                                                </label>
                                            </div>
                                            
                                            <Link
                                                href="/forgot-password" className="text-blue-500 hover:text-teal-600 text-sm">
                                                Mot de passe oublié
                                            </Link>
                                        </div>
                                        
                                        <AuthSubmitButton text="S&apos;identifier" isLoading={isLoading} />
                                    </form>
                                )}
                            </Formik>
                            
                            <div className="pt-4 pb-3">
                                <div className="font-light text-center text-gray-500 space-x-1 flex items-center justify-center">
                                    <div>Pas encore de compte?</div>
                                    <Link href="/register">
                                        <span className="font-normal text-teal-500 hover:text-teal-600">
                                            Créer un compte
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