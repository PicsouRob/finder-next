"use client";

import React, {
    useEffect, useState, useCallback, useRef
} from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSession } from "next-auth/react";
import { ArrowLeftIcon, FingerPrintIcon } from '@heroicons/react/24/solid';

import SignLeft from "@/components/SignLeft";
import InputField from '@/components/InputField';
import Error from '@/components/Error';
import AuthSubmitButton from '@/components/AuthSubmitButton';

import email from '@/public/icons/email.svg';

const validation = Yup.object().shape({
    email: Yup.string().email('Addresse email incorrect')
        .required("L'email est obligatoire"),
});

const ForgotPassword: React.FC = () => {
    const { data: session } = useSession();
    const router: AppRouterInstance = useRouter();
    const [isResetLinkSended, setIsResetLinkSended] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formRef = useRef<FormikProps<{ email: string; }> | null>(null);
    
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
    
    const handleSubmitForm = async (values: { email: string }) => {
        try {
            setError("");
            setIsLoading(true);
            
            const response = await fetch("/api/auth/forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(values)
            });
            
            const result = JSON.parse(await response.json());
            
            if(response.ok) {
                setIsResetLinkSended(true);
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
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <SignLeft />
            
            <div className="flex-1 m-auto w-full">
                <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                    <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24 text-gray-800">
                        <div className="pb-4">
                            <div className="mb-3">
                                <div className="rounded max-w-max border border-gray-200 p-2.5">
                                    <FingerPrintIcon className="h-10 w-10" />
                                </div>
                                <h1
                                    className="writespace-nowrap text-3xl font-bold leading-loose tracking-wide"
                                >
                                    Mot de passe oublié?
                                </h1>
                                
                                <span
                                    className="font-light text-gray-500"
                                >
                                    Pas de soucis, nous vous enverrons des instructions de réinitialisation.
                                </span>
                            </div>
                            
                            <Formik
                                initialValues={{ email: '' }}
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
                                        
                                        {isResetLinkSended && !isLoading ? (
                                            <div className="pt-1">
                                                <div className="bg-green-100 py-3 px-6 rounded mt-5 text-[14px]">
                                                    <p className="text-green-800">Un e-mail a ete envoye a votre adresse electronique pour reinitialiser votre mot de passe.</p>
                                                </div>
                                            </div>
                                        ) : <AuthSubmitButton
                                                text="Continuer" isLoading={isLoading}
                                            />
                                        }
                                        
                                        <div className="pt-5">
                                            <Link
                                                href="/signin" 
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <ArrowLeftIcon className="h-5 w-5" />
                                                <p className="">Retour a s&lsquo;inscrire</p>
                                            </Link>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;