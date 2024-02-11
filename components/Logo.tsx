"use client";

import React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => {
    return (
        <>
            <Link href="/">
                <div className="flex items-center justify-center gap-x-1 font-sans">
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-sm">
                        <span className="font-bold text-white">F</span>
                    </div>
                    <span className="text-primary text-xl font-bold md:text-2xl">
                        Finder
                    </span>
                </div>
            </Link>
        </>
    );
}

export default Logo;