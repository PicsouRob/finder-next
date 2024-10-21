import React from 'react';
import {
    BadgeCent, BriefcaseBusiness, ChevronRightIcon, Edit, Home, Info, Mail, Menu,
    UserRoundCog, UserRoundSearch
} from 'lucide-react';
import Link from 'next/link';

import {
    Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger
} from '../ui/sheet';
import Logo from '../commons/Logo';
import SignOutModal from './SignOutModal';
import DrawerLink from './DrawerLink';
import UserAvatar from './UserAvatar';

type DrawerLinkProps = {
    session: any,
    isAuthenticated: boolean
}

const Drawer: React.FC<DrawerLinkProps> = ({ session, isAuthenticated }) => {
    return (
        <div className=''>
            <Sheet>
                <SheetTrigger className='lg:hidden'>
                    <Menu />
                </SheetTrigger>

                <SheetContent className='flex flex-col items-start justify-between p-0'>
                    <div className="space-y- w-full">
                        <SheetHeader className='items-start p-5'>
                            <Logo />
                        </SheetHeader>

                        <div className="">
                            <DrawerLink text="Accueil" link="/">
                                <Home className='size-5' />
                            </DrawerLink>

                            <div className="py-4">
                                <p className="font-medium pl-5 text-gray-500 text-sm">Explorer</p>

                                <div className="space-y-2">
                                    <DrawerLink text="Des freelancers qualifiés" link="/search?query=freelancers">
                                        <UserRoundSearch className='size-5' />
                                    </DrawerLink>

                                    <DrawerLink text="Des ambaucheurs" link="/search?query=ambaucheurs">
                                        <BriefcaseBusiness className='size-5' />
                                    </DrawerLink>

                                    <DrawerLink text="Voir des projets" link="/search?query=projects">
                                        <UserRoundCog className='size-5' />
                                    </DrawerLink>
                                
                                    <DrawerLink text="Voir des publicités" link="/search?query=pubs">
                                        <BadgeCent className='size-5' />
                                    </DrawerLink>
                                </div>
                            </div>

                            <DrawerLink text="À propos Finder" link="/about">
                                <Info className='size-5' />
                            </DrawerLink>

                            <DrawerLink text="Contact" link="/contact">
                                <Mail className='size-5' />
                            </DrawerLink>

                            {isAuthenticated && (
                                <DrawerLink text="Éditer mon profil" link={`/update-profile?id=${session.user.id}`}>
                                    <Edit className='size-5' />
                                </DrawerLink>
                            )}
                        </div>
                    </div>

                    {isAuthenticated && (
                        <>
                            <Link href={`profile?id=${session.user.id}`}
                                className="px-5 py-2 w-full flex items-center justify-between gap-2 hover:bg-primary/10 hover:text-primary transition duration-200 ease-in-out"
                            >
                                <div className="flex items-center gap-3">
                                    <UserAvatar fallback={session.user.name.charAt(0)}
                                        avatar={session.user.avatar}
                                        style='size-12'
                                    />

                                    <div className="">
                                        <h4 className="font-medium text-gray-700 text-sm">{session.user.name}</h4>
                                        <p className="text-sm text-gray-500">{session.user.email}</p>
                                    </div>
                                </div>

                                <ChevronRightIcon className='size-4 text-gray-500' />
                            </Link>

                            <SheetFooter className='justify-end p-5 w-full'>
                                <SignOutModal />
                            </SheetFooter>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Drawer;