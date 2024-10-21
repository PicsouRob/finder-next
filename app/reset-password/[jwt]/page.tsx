"use client";

import { LockIcon } from 'lucide-react';

import Error from '@/components/commons/Error';
import AuthSubmitButton from '@/components/auth/AuthSubmitButton';
import ExpiredToken from './ExpiredToken';
import SignLeft from '@/components/auth/SignLeft';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Logo from '@/components/commons/Logo';
import { useResetPassword } from '@/hooks/auth/useResetPassword';

const ResetPassword: React.FC = () => {
    const { form, handleSubmitForm, isLoading, error, isExpiredToken } = useResetPassword();
    
    return (
        <div className="">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <SignLeft />
            
                <div className="flex-1 m-auto w-full">
                    <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                        <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24 text-gray-800">
                            {isExpiredToken ? <ExpiredToken /> : (
                                <div className="pb-4">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded max-w-max border border-gray-200 p-2.5">
                                                <LockIcon className="h-10 w-10" />
                                            </div>

                                            <Logo />
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
                                
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="w-full space-y-4 text-gray-700">
                                            {error && <Error title='Reinitialisation du mot de passe' text={error} />}
                                        
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Mot de passe</FormLabel>

                                                        <FormControl>
                                                            <Input placeholder="Votre mot de passe" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirmation</FormLabel>

                                                        <FormControl>
                                                            <Input placeholder="Confirmer votre mot de passe" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        
                                            <AuthSubmitButton text="Réinitialiser mot de passe" isLoading={isLoading} />
                                        
                                        </form>
                                    </Form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;