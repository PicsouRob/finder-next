"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ChevronDownIcon, ChevronUpIcon
} from '@heroicons/react/24/solid';

import profil from '@/public/Images/profil.svg';
import MenuBurger from './MenuAmburger';
import DropDownUp from './DropDownUp';
import Logo from './Logo';
import { menuData } from '@/utils/data';
import { MenuData } from '@/types/globalTypes';
import { useShowHeader } from '@/hooks/useShowHeader';

const Header: React.FC = () => {
    const { data: session, status } = useSession();
    const [dropdown, setDropdown] = useState<boolean>(false);
    const show: boolean = useShowHeader();

    return (
        <div className="">
            {
                show && (
                    <div className="relative border-b-gray-200 w-full py-4 z-20 border-b" id="outer-container">
                        <div className="flex items-center justify-between max-w-7xl px-6 mx-auto lg:px-8">
                            <Logo />
                            
                            <div className="text-primary hidden md:flex gap-x-8 md:gap-x-16 items-center">
                                {menuData.map(({ title, to }: MenuData, index) => (
                                    <Link
                                        href={to} 
                                        className="cursor-pointer hover:opacity-90 transition-all duration-200"
                                        key={ index }
                                    >
                                        { title }
                                    </Link>
                                )) }
                            </div>
                            
                            <div className="relative flex items-center justify-between gap-3">
                                { status === "authenticated" ? (
                                    <div className="rounded-full" >
                                        <div className="hover:opacity-80 cursor-pointer"
                                            onClick={ () => setDropdown(!dropdown) }
                                        >
                                            {session?.user && <div
                                                className="border rounded py-1 px-2 flex items-center gap-3"
                                            >
                                                <Image width="12" height="6"
                                                    src={session?.user.picture! || profil}
                                                    alt={session?.user.name!}
                                                    className="w-8 h-8 rounded-full bg-cover"
                                                />
                                                
                                                <div
                                                    className="transition-all duration-200 h-4 w-4 text-primary"
                                                >
                                                    {dropdown ? <ChevronUpIcon /> :
                                                    <ChevronDownIcon />}
                                                </div>
                                            </div>}
                                        </div>
                                        
                                        <DropDownUp dropdown={ dropdown } setDropdown={ setDropdown }
                                            user={session?.user}
                                        />
                                    </div>
                                ) : (
                                    <Link href="/signin"
                                        className="py-2 px-3 block rounded-sm outline-none text-[14px] bg-primary text-white hover:opacity-90 font-medium"
                                    >
                                        Se Connecter
                                    </Link>
                                )}
                                
                                <MenuBurger />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Header;