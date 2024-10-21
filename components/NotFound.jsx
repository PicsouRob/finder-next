import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Footer from './Footer';
import Header from './Header';

const NotFound = () => {
    return (
        <div className="relative w-full">
            <Header />
            
            <div className="grid place-items-center">
                <div className="flex flex-col items-center justify-center gap-y-10 min-h-screen px-6 md:pz-8 w-full md:w-2/4 text-center">
                    <Image width={100} height={100} alt="img" src="/found" className="h-40" />
                    
                    <span className="">
                        Une erreur s&apos;est produite, peut-être que la page que vous recherchez n&apos;a pas été trouvée ou n&apos;a jamais existé.
                    </span>
                    
                    <Link href="/"
                        className="bg-red-500 rounded-lg text-white px-5 py-2.5 md:py-3 font-medium hover:bg-green-500 cursor-pointer"
                    >
                        Retour a la page d&apos;accueil
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default NotFound;
