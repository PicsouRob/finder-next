"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <div className="flex items-center justify-center gap-x-1 font-sans">
                <Image className='size-8 text-primary' width={40} height={40} src="/icons/logo.svg" alt="logo" />

                <span className="text-primary text-xl font-bold md:text-2xl">
                    Finder
                </span>
            </div>
        </Link>
    );
}

export default Logo;