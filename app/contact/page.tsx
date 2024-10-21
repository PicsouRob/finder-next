"use client";

import { useState } from 'react';
import Image from 'next/image';

import SocialMedia from '@/components/SocialMedia';
import { ContactInput } from '@/types/globalTypes';
import { ContactData, contactData } from '@/utils/data';

const Contact: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmitEmail = (values: ContactInput) => {
        const { name, email, message } = values;
        setIsLoading(true);
    }

    return (
        <div className="relative w-full">
            <div className="max-w-7xl mx-auto">
                <div className="">
                    <div className="bg-primary md:rounded-lg md:mt-8 lg:mt-12 text-white py-8 px-6 lg:py-16 space-y-2 md:mx-8">
                        <div className="w-full md:w-1/2">
                            <h1 className="font-bold text-2xl lg:text-3xl leading-8 pb-2">Contactez-nous</h1>
                            <p className="text-white text-base lg:pr-10">Nous serions ravis de discuter de la manière dont nous pouvons vous aider.</p>
                        </div>
                    </div>
                    
                    <div className="px-6 md:px-8">
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 py-12 md:px-12">
                            <div className="w-full">
                                <div className="pb-3">
                                    <h1 className="text-2xl md:text-3xl font-bold pb-3">Restez en contact avec nous.</h1>
                                    
                                    <span className="">Pour demander un avis ou obtenir des informations sur notre société, contactez-nous directement ou remplissez le formulaire et nous vous répondrons dans les plus brefs délais.</span>
                                </div>
                                
                                <div className='flex flex-col space-y-8 pt-4'>
                                    {contactData.map(({ title, text, open }: ContactData, ind) => (
                                        <div key={ind}
                                            className="flex items-center my-3 h-10 gap-x-4 w-full cursor-pointer"
                                            onClick={() => {
                                                open != '' ? document.open(open) : {}
                                            }}
                                        >
                                            <Image
                                                width="25" height="12"
                                                src={`/images/contact${ind + 1}.png`} alt={title}
                                                className="bg-cover h-12 w-12"
                                            />
                                            
                                            <div className="space-y-3">
                                                <h1 className="font-medium leading-8">{title}</h1>
                                                <span className="">{text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <SocialMedia color="#fff" />
                            </div>
                            
                            <div className="w-full md:shadow-md rounded-md p-4 border space-y-7 divide-y md:-mt-36 bg-white">
                                <div className="space-y-3">
                                    <h1 className="font-semibold text-2xl">Parlez nous de vous</h1>
                                    <p className="text-base">Que vous ayez des questions ou que vous souhaitiez simplement dire bonjour, contactez-nous.</p>
                                </div>
                                
                                <div className="pt-4">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;