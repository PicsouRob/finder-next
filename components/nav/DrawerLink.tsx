import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

type DrawerLinkProps = {
    text: string;
    link: string;
    children: ReactNode;
}

const DrawerLink: React.FC<DrawerLinkProps> = ({ text, link, children }) => { 
    return (
        <Link href={link}
            className="flex items-center gap-4 px-5 justify-between w-full py-3 hover:bg-primary/10 hover:text-primary transition duration-200 ease-in-out"
        >
            <div className="flex items-center gap-4">
                {children}

                <p className="text-sm font-medium text-gray-700 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                    {text}
                </p>
            </div>

            <ChevronRightIcon className='size-4 text-gray-500' />
        </Link>
    );
}

export default DrawerLink;  