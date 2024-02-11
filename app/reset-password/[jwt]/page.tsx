"use client";

import React, {
    useEffect, useState, useCallback, useRef
} from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSession } from "next-auth/react";
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import SignLeft from "@/components/SignLeft";
import InputField from '@/components/InputField';
import { ResetPasswordProps } from '@/types/user';
import Error from '@/components/Error';
import AuthSubmitButton from '@/components/AuthSubmitButton';
import ExpiredToken from './ExpiredToken';

import lock from '@/public/icons/lock.svg';
import { newVerification } from '@/actions/new-verification';

const validation = Yup.object().shape({
    password: Yup.string().min(8, 'Le mot de passe doit être au moins de 8 caractères').required("Le mot de passe est obligatoire"),
    confirmPassword: Yup.string().min(8, 'La confirmation mot de passe doit être au moins de 8 caractères')
    .required("La confirmation de mot de passe est obligatoire")
    .oneOf([Yup.ref('password'), "null"], 'Le mot de passe doit correspondre!'),
});

const ResetPassword: React.FC = () => {
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const { jwt }: { jwt: string } = useParams();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExpiredToken, setIsExpiredToken] = useState<boolean>(false);
    const formRef = useRef<FormikProps<{ confirmPassword: string; password: string; }> | null>(null);
    
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
    
    const handleSubmitForm = async (values: ResetPasswordProps) => {
        try {
            setError("");
            setIsLoading(true);
            
            const response = await fetch("/api/auth/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ ...values, jwtUserId: jwt })
            });
            
            const result = JSON.parse(await response.json());
            
            if(response.ok) {
                toast.success(`${result?.message}`, { duration: 5 });
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
    
    return (
        <div className="">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <Toaster />
                <SignLeft />
            
                <div className="flex-1 m-auto w-full">
                    <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                        <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24 text-gray-800">
                            {isExpiredToken ? <ExpiredToken /> : (
                                <div className="pb-4">
                                    <div className="mb-3">
                                        <div className="rounded max-w-max border border-gray-200 p-2.5">
                                            <LockClosedIcon className="h-10 w-10" />
                                        </div>
                                        <h1
                                            className="writespace-nowrap text-3xl font-bold leading-loose tracking-wide"
                                        >
                                            Nouveau mot de passe
                                        </h1>
                                    
                                        <span
                                            className="font-light text-gray-500"
                                        >
                                            Votre mot de passe doit contenir au moins 8 caractères.
                                        </span>
                                    </div>
                                
                                    <Formik
                                        initialValues={{
                                            password: "", confirmPassword: ""
                                        }}
                                        validationSchema={validation}
                                        onSubmit={(values) => handleSubmitForm(values)}
                                        innerRef={formRef}
                                    >
                                        {({ values, errors, handleSubmit, handleChange, touched }) => (
                                            <form onSubmit={handleSubmit} className="w-full space-y-2 text-gray-700">
                                                {error && <Error text={error} />}
                                            
                                                <InputField
                                                    name="password"
                                                    type="password"
                                                    label="Nouveau mot de passe"
                                                    value={values.password}
                                                    error={errors.password}
                                                    svg={lock}
                                                    errorMessage={errors.password}
                                                    handleChange={handleChange}
                                                    placeholder="Nouveau mot de passe"
                                                />
                                            
                                                <InputField
                                                    name="confirmPassword"
                                                    type="password"
                                                    label="Confirmer mot de passe"
                                                    value={values.confirmPassword}
                                                    error={errors.confirmPassword}
                                                    svg={lock}
                                                    errorMessage={errors.confirmPassword}
                                                    handleChange={handleChange}
                                                    placeholder="Confirmer votre mot de passe"
                                                />
                                            
                                                <AuthSubmitButton text="Réinitialiser mot de passe" isLoading={isLoading} />
                                            
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                            <div className="pt-5">
                                <Link
                                    href="/signin"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                    <p className="">Retour a s&lsquo;inscrire</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;