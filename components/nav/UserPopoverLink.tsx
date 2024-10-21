import Link from "next/link";
import React, { ReactNode } from "react";

type UserPopoverLinkProps = {
    text: string;
    link: string;
    children: ReactNode;
}

const UserPopoverLink: React.FC<UserPopoverLinkProps> = ({ text, link, children }) => {
    return (
        <Link href={link} className="flex items-center gap-3 w-full h-full py-2 hover:bg-gray-50 hover:text-opacity-70 transition-all duration-200">
            {children}

            <p className="text-sm font-medium text-gray-700 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                {text}
            </p>
        </Link>
    );
}

export default UserPopoverLink;