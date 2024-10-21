"use client";

import React, { useContext } from 'react';
import Link from 'next/link';

import Logo from '../commons/Logo';
import ExploreFinder from './ExploreFinder';
import { SessionContext } from '@/context/sessionContext';
import UserPopover from './UserPopover';
import Drawer from './Drawer';

const Header: React.FC = () => {
    const { session, isAuthenticated } = useContext(SessionContext);
    console.log("session: ", session);

    return (
        <header className="relative py-4 md:py-5 bg-gray border-b border-gray-200 bg-white">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
                        <Link href="/" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Accueil </Link>

                        <ExploreFinder />
                        
                        <Link href="/about" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> À propos Finder </Link>

                        <Link href="/contact" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Contact </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isAuthenticated ? (
                            <div className="hidden lg:ml-auto lg:flex lg:items-center xl:space-x-6">
                                <Link href="/signin" className="px-4 py-2 border duration-200 hover:bg-primary/10 hover:text-primary rounded focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                    Se connecter
                                </Link>

                                <Link href="/register" className="hidden lg:block px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-primary border border-transparent rounded hover:bg-primary/80 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
                                    Créer un compte
                                </Link>
                            </div>
                        ) : (
                            <UserPopover session={session} />
                        )}

                        <Drawer session={session} isAuthenticated={isAuthenticated} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;