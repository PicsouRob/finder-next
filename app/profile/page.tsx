"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CameraIcon } from "lucide-react";

import { User } from '@/types/model';
import avatar from '@/public/avatar/5.jpg';
import backdrop from '@/public/images/backdrop.jpg';
// import Rating from '@/components/Rating';
import { profileOptions } from '@/utils/data';

const UserProfile = ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const router = useRouter();
    const { id } = searchParams;
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [optionSelected, setOptionSelected] = useState<number>(0);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch(`/api/auth/user?id=${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", }
                });

                const result = JSON.parse(await response.json());

                if (response.ok) {
                    setUserProfile(result);
                } else {
                    console.log(`${result?.message}`);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }

        getUserProfile();
    }, [id]);

    useEffect(() => {
        if (!id) router.back();
    }, [id, router]);
    
    return (
        <div className='relative min-h-screen'>
            <div className="relative h-48"

            >
                <Image height="0" width="0"
                    src={userProfile?.backdropImage || backdrop} alt='backdrop'
                    className='w-full h-full bg-cover bg-bottom object-cover object-center'
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="relative max-w-7xl px-6 md:px-8 mx-auto">
                    <button
                        className="absolute bottom-4 right-16 px-4 py-3 rounded text-white bg-blend-lighten bg-white/20"
                    >
                        Changer la photo
                    </button>
                </div>
            </div>

            <div className="relative h-48 max-w-7xl mx-auto px-6 md:px-8">
                <div className="relative flex items-center justify-between gap-4">
                    <div className="relative flex items-center gap-5">
                        <div className="-mt-10 relative h-24 w-24 z-10 md:h-32 md:w-32 lg:h-40 lg:w-40">
                            <Image width="0" height="0"
                                src={userProfile?.avatar || avatar} alt='avatar'
                                className='rounded-full h-full w-full p-1 border-4 border-spacing-2 border-green-500'
                            />
                            <div className="absolute bottom-1 p-2 right-0 bg-white rounded-full">
                                <CameraIcon className='h-6 w-6 cursor-pointer' />
                            </div>
                        </div>

                        <div className="relative space-y-1 text-primary mt-2 float-end">
                            <h1 className="font-bold text-2xl">Phanord Picsou Roberto</h1>
                            <p className="">Web Developpeur</p>

                            <div className="flex items-center gap-3">
                                {/* <Rating rateValue={3.5} /> */}
                                <p className=""><strong>4.3</strong> (12 Commentaires)</p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <button
                            onClick={() => router.push("/")}
                            className="absolute bottom-5 right-10 px-4 py-3 rounded text-white bg-blend-lighten bg-primary"
                        >
                            Editer mon profile
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0">
                    <ul className="flex items-center">
                        {profileOptions.map((data, ind) => (
                            <li key={ind}
                                className={`${data.index === optionSelected && "border-b-2 border-b-green-500 text-green-500"} text-primary/90 border-b-2 border-b-transparent font-bold px-3 py-2 cursor-pointer transition-all duration-200 ease-in-out`}
                                onClick={() => setOptionSelected(data.index)}
                            >
                                {data.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-gray-100 h-[500px]">

            </div>
        </div>
    );
}

export default UserProfile;