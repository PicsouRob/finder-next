import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
    DialogTitle, DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';

const SignOutModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const confirmSignOut = async () => {
        setIsLoading(true);

        try {
            await signOut();
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <Button
                    className="xl:text-base font-medium flex w-full items-center gap-2 shadow-none border py-5 text-gray-600 bg-transparent transition duration-200 rounded focus:outline-none hover:text-white hover:bg-red-500 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                    <LogOut className='size-5' />

                    Se déconnecter
                </Button>
            </DialogTrigger>

            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogTitle>Deconnection</DialogTitle>
                
                <DialogDescription>
                    Veillez confirmer la déconnexion si vous êtes sûr de vouloir vous déconnecter ou annule la l&apos;opération.
                </DialogDescription>

                <DialogFooter className='gap-4 pt-5'>
                    <Button disabled={isLoading}
                        onClick={() => confirmSignOut()}
                        className="text-white bg-red-500 text-base gap-2"
                    >
                        {isLoading &&
                            <div
                                className="animate-spin rounded-full size-4 border-l-2 border-b-2 border-white"
                            />
                        }

                        {isLoading ? "Traitement en cours..." : "Confirmer"}
                    </Button>

                    <DialogClose
                        disabled={isLoading}
                        className='border px-6 transition duration-150 ease-in-out rounded hover:bg-gray-100 hover:border-primary'>
                        Annuler
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SignOutModal;