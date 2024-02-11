"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SocialMedia from "@/components/SocialMedia";
import Trusted from "@/components/home/Trusted";
import Info from "@/components/Info";
import Testimonial from "@/components/home/Testimonial";
import ContentInfo from "@/components/home/ContentInfo";
import SearchCategories from "@/components/home/SearchCategories";
import FindLink from "@/components/home/FindLink";
import Blog from "@/components/home/Blog";
import { useUserSession } from "@/hooks/useSession";

const Home: React.FC = () => {
    const [jobValue, setJobValue] = useState('');
    const [cityValue, setCityValue] = useState('Ville');
    const router = useRouter();
    const { isAuthenticated, session } = useUserSession();
    console.log("Session: ", session);
    console.log("IsAuthenticated: ", isAuthenticated);
    
    return (
        <div>
            <div className="relative overflow-hidden">
                <div className="py-16 sm:py-12 md:py-16 max-w-7xl px-6 mx-auto lg:px-8 text-primary">
                    <div 
                            className="space-y-5 flex flex-col justify-center items-center text-center bg-gray-100 py-10 rounded-2xl"
                    >
                        <div className="flex items-center space-x-3 text-[12px]">
                            <hr className="border-1 w-16" />
                            <span className="font-medium">Trouver des freelancers</span>
                            <hr className="border-1 w-16" />
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-normal font-bold max-w-4xl">
                            <span className="block xl:inline">Utilisez vos compétences pour gagner plus d&apos;emplois.</span>
                        </h1>
                        
                        <p className="text-base sm:max-w-xl sm:mx-auto mt-5 lg:mx-0">Ou Trouver des Embaucheurs autour de vous pour vos travaux.</p>
                        <hr className="my-2 border-0 bg-transparent" />
                        
                        <div className="flex items-center justify-center flex-wrap gap-4">
                            <Link href="/search/freelancers" className="bg-primary px-4 py-3 rounded border border-primary text-white font-medium hover:opacity-90">
                                Trouver un freelancer
                            </Link>
                            
                            <Link href="/add-skils" className="border px-4 py-3 rounded text-primary font-medium hover:opacity-90">
                                Poster un mettier
                            </Link>
                        </div>
                        
                        <SocialMedia color="#000" />
                    </div>
                </div>
            </div>
            
            {/* <Trusted /> */}
            <Info />
            <ContentInfo />
            <SearchCategories />
            <FindLink /> 
            <Blog />
            <Testimonial />
        </div>
    );
}

export default Home;