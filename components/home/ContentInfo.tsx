import React from 'react';
import Image from "next/image";

import image12 from "/public/images/h12.png";
import image13 from "/public/images/h12.png";
import image14 from "/public/images/h12.png";

const ContentInfo: React.FC = () => {
    const data: string[] = [
        "Connectez-vous à des pigistes ayant une expérience commerciale éprouvée",    
        "Faites-vous associer au talent parfait par un responsable de la réussite client",    
        "Qualité inégalée des emplois à distance, hybrides et flexibles",    
    ];
    
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative">
                    <Image width="0" height="0" src={image12} alt="h12" className="" />
                    <Image width="0" height="0" src={image13} alt="h13" className="absolute top-0" />
                    <Image width="0" height="0" src={image14} alt="h14" className="absolute -bottom-5" />
                </div>
                
                <div className="w-full lg:w-1/2 space-y-6 text-primary">
                    <div className="">
                        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
                        Rejoignez la meilleure place de marché au monde pour les travailleurs
                        </h1>
                        
                        <p className="mt-3 text-base text-primary/90">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. </p>
                    </div>
                    
                    <div className="space-y-5">
                        { data.map((item, ind) => (
                            <div key={ind} className="flex items-start gap-x-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <p className="text-primary/90">{ item }</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-5">
                        <button className="px-4 py-3 rounded-md transition duration-200 bg-primary hover:opacity-90 flex items-center gap-3 text-gray-200">
                            <span className="">Trouver des talents</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentInfo;