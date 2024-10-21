"use client";

import { useShowHeader } from '@/hooks/useShowHeader';
import SocialMedia from '../SocialMedia';
import FooterContent from './FooterContent';
import { about, categories, support } from '@/utils/footerData';

const Footer: React.FC = () => {
    const show: boolean = useShowHeader();
    const date: Date = new Date();
    const year: number = date.getFullYear();
    
    return (
        <div className="">
            {show && (
            <div className="relative bg-special py-4">
                <div className="max-w-7xl px-6 lg:px-8 mx-auto divide-y divide-gray-700 text-gray-500">
                    <div className="flex items-center justify-between flex-wrap py-3 text-[15px] md:text-[17px] font-medium text-white">
                        <div className="flex gap-3">
                            <span className="">Terms of Service</span>
                            <span className="">Privacy Policy</span>
                            <span className="">Site Map</span>
                        </div>
                        
                        <div className="flex gap-3 items-center">
                            <span className="font-normal">Suivez-nous</span>
                            <SocialMedia color="#fff" footer />
                        </div>
                    </div>
                    
                    <div className="py-6">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white gap-y-10 gap-x-6">
                            <FooterContent data={ about } title="À propos de" />
                            <FooterContent data={ categories } title="Catégories" />
                            <FooterContent data={support} title="Support" />
                            
                            <div className="w-full">
                                <h1 className="font-semibold text-[15px] text-white mb-4">S&apos;abonner</h1>
                                
                                <div className="rounded-md flex flex-col w-full gap-2">
                                    <input placeholder="Votre E-mail" className="bg-white text-[13px] focus:outline-none w-full" />
                                    <button className="font-semibold text-white hover:opacity-90 w-full px-3 py-2 bg-blue-700 text-[14px]">Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                        <p className="text-gray-400">Copyright © {year} - All Rights Reserved</p>
                        <select className="border border-gray-800 py-1 px-2 rounded bg-white text-primary w-[110px] space-x-3 focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200">
                            <option selected value="Francais">Francais</option>
                            <option value="Anglais">Anglais</option>
                            <option value="Espagnol">Espagnol</option>
                        </select>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Footer;