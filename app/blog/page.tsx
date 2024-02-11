import React from 'react';

import Blog from '@/components/home/Blog';

const AllBlog = () => {
    return (
        <div className="">
            <div className="space-y-2 mx-auto pt-10 md:pt-16 text-center px-6 md:px-8">
                <span 
                    className="text-red-800 font-bold uppercase"
                >
                    Blog
                </span>
                
                <h1 
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-800"
                >
                    Nos derniers articles.
                    </h1>
                <p className="">
                    Découvrez les dernières actualités, conseils et témoignages d&apos;utilisateurs de Finder.
                    </p>
            </div>
            
            <Blog allBlogPage />
        </div>
    );
}

export default AllBlog;