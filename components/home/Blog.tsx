import Image from "next/image";
import Link from "next/link";

import { blogData, BlogData } from "@/utils/blogData";

interface BlogProps {
    allBlogPage?: boolean,
}

const Blog: React.FC<BlogProps> = ({ allBlogPage }) => {
    return (
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-8">
            {!allBlogPage && (
                <div className="flex items-center justify-between flex-wrap gap-y-4 pb-4">
                        <div>
                            <h1 className="font-semibold text-xl sm:text-2xl md:text-2xl">
                                {allBlogPage ? "Voici Nos Blog" : "Notre Blog"}
                            </h1>
                            <p className="mt-2 text-base">Voyez comment vous pouvez améliorer votre statut de carrière</p>
                    </div>
                    
                    <div className="flex items-center border border-gray-700 p-1.5 rounded-sm">
                        <Link href="/blog" className="hover:underline hover:text-gray-900"
                        >
                            Tous les blogs
                        </Link>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            )}
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogData.map(({date, image, title, text, id}: BlogData, ind) => (
                    <Link href={`/blog/${id}`} key={ind} className="rounded-lg group cursor-pointer hover:bg-primary transition-all duration-300 ease-in-out border border-gray-200 text-gray-700">
                        <Image
                            height="200" width="200"
                            src={image} alt={date}
                            className="rounded-t-lg h-[200px] w-full bg-cover"
                        />
                        
                        <div className="p-4 space-y-3 group-hover:text-white">
                            <p className="group-hover:text-white text-xs">{ date }</p>
                            <h1 className="font-medium">{ title}</h1>
                            <p className="text-[14px] text-gray-500 group-hover:text-white">
                                {text}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Blog;