import React from 'react';
import { animated, useSpring } from 'react-spring';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

import profil from '@/public/Images/profil.svg';

interface DropDownUpProps {
    dropdown: boolean,
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    user: any,
}

const DropDownUp: React.FC<DropDownUpProps> = ({ 
    dropdown, setDropdown, user 
}) => {
    const { name, email, picture, id } = user;
    const router = useRouter();
    
    const handleSignOut = async () => {
        setDropdown(false);
        await signOut();
        router.refresh();
    }
    
    const dropDownLink = (href: string) => {
        router.push(`${href}`);
        setDropdown(false);
    }

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: dropdown ? 1 : 0,
        transform: dropdown ? 'translateY(0%)' : 'translateY(-100%)',
    });

    return <div>
        {dropdown && (
            <animated.div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg py-4 z-30 cursor-default min-w-max text-gray-600"
                style={animation}
            >
                <div className="flex flex-col gap-y-3">
                    <div className="grid place-items-center justify-center px-8 md:px-10">
                        <Image 
                            width="16" height="16"
                            alt="" 
                            className="h-16 w-16 rounded-full shadow-sm bg-cover" src={picture ? picture : profil}
                        />
                        
                        <span className="font-medium text-[14px]">{name}</span>
                        <p className="text-xs">{email}</p>
                        
                        <Link
                            href={`/profile/${id}`}
                            className="border rounded px-4 py-1.5 mt-3 hover:bg-primary hover:text-white text-[15px]"
                        ><p>Mon Profile</p>
                        </Link>
                    </div>
                    
                    <div className="divide-y">
                    <hr className="border-1 border-transparent" />
                        <DropdownLink
                            text="Ajouter competence" 
                            handleClick={() => dropDownLink("/add-skills")} 
                        />
                        
                        <DropdownLink 
                            text="Ajouter un job"
                            handleClick={() => dropDownLink("/add-job")}
                        />
                        
                        <DropdownLink
                            text="Embaucher un professionel" 
                            handleClick={() => dropDownLink("/search/freelancers")} 
                        />
                        
                        <DropdownLink 
                            text="Ajouter un blog"
                            handleClick={() => dropDownLink("/add-blog")}
                        />
                        <hr className="border-1" />
                    </div>
                    
                    <div className="grid place-items-center"
                        onClick={() => handleSignOut()}
                    >
                        <button className="py-2 text-base cursor-pointer border rounded px-4 text-gray-600 hover:bg-gray-100">
                            <p>Se déconnecter</p>
                        </button>
                    </div>
                </div>
            </animated.div>
        )}
    </div>;
}

interface DropdownLinkProps {
    text: string,
    handleClick: () => void,
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ text, handleClick }) => {
    return (
        <div
        onClick={() => handleClick()}
            className="flex items-center py-3 px-4 gap-x-4 font-medium text-gray-500  hover:bg-gray-100 text-[14px] cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <p className="">{text}</p>
        </div>
    );
}

export default DropDownUp;