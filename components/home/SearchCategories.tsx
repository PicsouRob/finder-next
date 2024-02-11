import React from 'react';
import Link from "next/link";

import { categoriesData } from '@/utils/categoriesData';

const SearchCategories: React.FC = () => {
    return (
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 pb-16 pt-10">
            <div className="flex items-center justify-between flex-wrap gap-y-4 pb-4">
                <div>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl">
                        Recherche par catégories
                    </h1>
                    
                    <p className="mt-2 text-base">Vous aurez l&apos;oportinute de travailler avec toutes ces professionels du pays.</p>
                </div>
            </div>
            
            <div
                className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mx-auto"
            >
                { categoriesData.slice(0, 15).map(({ title, icon }, index) => (
                    <div
                        className="flex items-center border rounded-lg px-3 py-2 text-center group hover:bg-primary duration-300 transition-all ease-in gap-3"
                        key={index}
                    >
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary group-hover:bg-white text-white group-hover:text-primary"
                        >
                            { icon }
                        </div>
                        <p 
                            className="text-[15px] group-hover:text-white text-black"
                        >
                            { title }
                        </p>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default SearchCategories;