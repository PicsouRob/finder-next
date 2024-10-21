"use client";

import { BriefcaseBusiness, Laptop } from 'lucide-react';

import SignFooter from '@/components/auth/SignFooter';
import Error from '@/components/commons/Error';
import AuthSubmitButton from '@/components/auth/AuthSubmitButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/commons/Logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SelectCity from './SelectCity';
import { Textarea } from '@/components/ui/textarea';
import { useCompleteSignup } from '@/hooks/auth/useCompleteSignup';

const Register: React.FC = () => {
    const {
        form, handleAvatar, addAvatar, fileRef, handleSubmitForm,
        deleteAvatar, isLoading, error, avatar, userData 
    } = useCompleteSignup();

    return (
        <div className="relative grid min-h-screen">
            <div className="flex-1 m-auto w-full">
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <div className="w-full flex flex-col px-4 py-10 lg:px-14 xl:px-24">
                        <div className="space-y-6">
                            <div className="flex flex-col items-start gap-2">
                                <Logo />
                                <h1 className="text-xl xl:text-2x font-bold text-special">Completer votre profile.</h1>
                                <p className="text-gray-500 text-sm">Remplir les champs suivants pour finaliser votre inscription.</p>
                            </div>

                            <hr className="" />

                            {error && <Error title='Compléter votre profil' text={error} />}

                            <div className="space-y-3">
                                <Label>Photo de profil</Label>

                                <div className="flex items-center justify- gap-3">
                                    <Input ref={fileRef}
                                        onChange={(e) => {
                                            if (avatar) {
                                                deleteAvatar();
                                                addAvatar(e);
                                            } else {
                                                addAvatar(e);
                                            }
                                        }}
                                        type='file' name='avatar'
                                        className='hidden' accept='image/*'
                                    />
                                            
                                    <Avatar className='size-12 border'>
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    {form.getValues("avatar") ? (
                                        <>
                                            <Button onClick={() => deleteAvatar()} type='button'
                                                className='bg-transparent text-gray-700 shadow-none border hover:border-primary hover:text-white'>Supprimer</Button>
                                            <Button type='button' onClick={() => handleAvatar()}
                                                className='bg-transparent text-gray-700 shadow-none border hover:border-primary hover:text-white'>Modifier</Button>
                                        </>
                                    ) : (
                                        <Button type='button'
                                            onClick={handleAvatar}
                                            className='bg-transparent text-gray-700 shadow-none border hover:border-primary hover:text-white'
                                        >
                                            Ajouter une photo
                                        </Button>
                                    )}
                                </div>

                                {!form.getValues("avatar") && form.formState.errors.avatar && <span className="text-red-600 font-medium text-xs">{form.formState.errors.avatar.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Type D&apos;utilisateur</Label>

                                <div className="grid grid-cols-2 gap-4">
                                    {["Freelancer", "Ambaucheur"].map((data, index) => (
                                        <Alert
                                            onClick={() => form.setValue("type", data)} key={index}
                                            className={`flex flex-col md:flex-row gap-2 md:items-center transition duration-150 ease-in-out hover:border-primary border cursor-pointer ${data === form.watch("type") && "border-primary"}`}
                                        >
                                            <Checkbox checked={data === form.getValues("type")} id='' className='text-white absolute right-4 rounded-full' />

                                            <div className="">
                                                {data === "Freelancer" ? <Laptop className='text-gray-500 size-6' /> : <BriefcaseBusiness className='text-gray-500 size-6' />}
                                            </div>

                                            <AlertDescription className='text-base'>{data}</AlertDescription>
                                        </Alert>
                                    ))}
                                </div>

                                {!form.getValues("type") && form.formState.errors.type && <span className="text-red-600 font-medium text-xs">{form.formState.errors.type.message}</span>}
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmitForm)} className="grid md:grid-cols-2 gap-4 w-full text-gray-700 mt-3">                    
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem className='md:col-span-2'>
                                                <FormLabel>Carrière</FormLabel>

                                                <FormControl>
                                                    <Input placeholder="Ex: Ingenieur de logiciel" {...field} className='placeholder:text-gray-600 placeholder:text-xs' />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Numero de téléphone</FormLabel>

                                                <FormControl>
                                                    <Input placeholder="Votre numéro de téléphone" {...field} className='placeholder:text-gray-600 placeholder:text-xs' />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <SelectCity control={form.control} />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className='md:col-span-2'>
                                                <FormLabel>Biographie</FormLabel>

                                                <FormControl>
                                                    <Textarea rows={5} placeholder="Votre biographie" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <div className="md:col-span-2">
                                        <AuthSubmitButton text="Soumettre" isLoading={isLoading} />
                                    </div>
                                </form>
                            </Form>
                            
                            <div className="pt-">
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