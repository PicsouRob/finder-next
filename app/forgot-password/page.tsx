"use client";

import Link from 'next/link';
import { ArrowLeftIcon, FingerprintIcon } from 'lucide-react';

import Error from '@/components/commons/Error';
import AuthSubmitButton from '@/components/auth/AuthSubmitButton';
import SignLeft from '@/components/auth/SignLeft';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Logo from '@/components/commons/Logo';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';

const ForgotPassword: React.FC = () => {
    const { form, handleSubmitForm, isLoading, error, isResetLinkSended } = useForgotPassword();
    
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <SignLeft />
            
            <div className="flex-1 m-auto w-full">
                <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                    <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24 text-gray-800">
                        <div className="pb-4">
                            <div className="mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded max-w-max border border-gray-200 p-2.5">
                                        <FingerprintIcon className="h-10 w-10" />
                                    </div>

                                    <Logo />
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
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmitForm)} className="w-full space-y-2 text-gray-700">
                                    {error && <Error title='Reinitialisation du mot de passe' text={error} />}
                                    
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Addresse Électronique</FormLabel>

                                                <FormControl>
                                                    <Input placeholder="Votre adresse e-mail" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    {isResetLinkSended && !isLoading ? (
                                        <div className="pt-1">
                                            <div className="bg-green-100 py-3 px-6 rounded mt-5 text-[14px]">
                                                <p className="text-green-800">Un e-mail a ete envoye a votre adresse electronique pour reinitialiser votre mot de passe.</p>
                                            </div>
                                        </div>
                                    ) :
                                        <>
                                            <AuthSubmitButton
                                                text="Continuer" isLoading={isLoading}
                                            />
                                            
                                            <div className="pt-5">
                                                <Link
                                                    href="/signin"
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <ArrowLeftIcon className="h-5 w-5" />

                                                    <p className="">Retour a s&lsquo;inscrire</p>
                                                </Link>
                                            </div>
                                        </>
                                    }
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;