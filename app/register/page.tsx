"use client";

import Link from 'next/link';

import SignFooter from '@/components/auth/SignFooter';
import Error from '@/components/commons/Error';
import AuthSubmitButton from '@/components/auth/AuthSubmitButton';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SignLeft from '@/components/auth/SignLeft';
import SignTop from '@/components/auth/SignTop';
import { Checkbox } from '@/components/ui/checkbox';
import { useRegister } from '@/hooks/auth/useRegister';

const Register: React.FC = () => {
    const { form, handleSubmitForm, isLoading, error } = useRegister();

    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <SignLeft />
            
            <div className="flex-1 m-auto w-full">
                <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
                    <div className="w-full flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
                        <div className="pb-4">
                            <SignTop title="Bienvenue!"
                                text="Connectez-vous maintenant pour gérer vos compétences en toute simplicité"
                            />
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmitForm)} className="w-full space-y-4 text-gray-700 mt-3">
                                    {error && <Error text={error} />}
                                            
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom complet</FormLabel>

                                                <FormControl>
                                                    <Input placeholder="Example: John Doe" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

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
                                    
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms2" className='text-white' />
                                        <label
                                            htmlFor="terms2"
                                            className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            J&apos;acceptes les termes et les conditions d&apos;utilisations
                                        </label>
                                    </div>
                                    
                                    <AuthSubmitButton text="Créer mon compte" isLoading={isLoading} />
                                </form>
                            </Form>
                            
                            <div className="pt-4 pb-3">
                                <div className="font-light text-center text-gray-500 text-sm flex-wrap space-x-1 flex items-center justify-center">
                                    <div>Avez-vous déjà un compte?</div>
                                    <Link href="/signin">
                                        <span className="font-normal text-primary hover:opacity-80">
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

export default Register;