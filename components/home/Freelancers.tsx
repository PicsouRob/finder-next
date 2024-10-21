import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

const Freelancers: React.FC = () => {
    const jobs = Array(6).fill(0);

    return (
        <div className='relative pt- pb-10 sm:pb-16'>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
                <div className="space-y-3">
                    <p className="uppercase text-sm">Vous cherchez à recruter?</p>
                    <h2 className="font-bold text-2xl lg:text-3xl text-gray-700">Découvrez les meilleurs Freelancers</h2>
                </div>

                <div className="pt-6 grid md:grid-cols-2 lg:grid-cols- xl:grid-cols-3 gap-y-6 sm:gap-x-5 md:gap-x-6">
                    {jobs.map((job, index) => (
                        <Link href="jobs/" key={index} className="rounded-md">
                            <Alert className='space-y-3 shadow-none hover:border-primary hover:bg-primary group hover:text-white transition ease-in-out duration-200'>
                                <AlertTitle className='grid gap-2'>
                                    <div className="flex items-center">
                                        <Image width={100} height={100} className="flex-shrink-0 object-cover rounded-full size-16 xl:size-20" src="/avatar/5.jpg" alt="phanord" />
                                            
                                        <div className="ml-4">
                                            <p className="text-base font-semibold text-gray-700 group-hover:text-white font-pj">Phanord Roberto</p>
                                            <p className="mt-0.5 text-sm font-pj text-gray-600 font-normal group-hover:text-white">Membre depuis: 15 / 03 / 2024</p>
                                        </div>
                                    </div>
                                </AlertTitle>

                                <AlertDescription className='font-mediu text-gray-700 text-lg group-hover:text-white'>
                                    Ingenieur de logiciel - Designer UX/UI
                                </AlertDescription>

                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm">$HT 500Hr</p>
                                    
                                    <div className="flex items-center gap-1 px-3 py-1 border border-primary group-hover:border-white rounded-full max-w-max hover:border-white">
                                        <Check className='size-4 text-primary group-hover:text-white' />
                                        
                                        <p className="text-xs">Disponible maintenant</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    {jobs.slice(0, 2).map((_, ind) => (
                                        <span key={ind} className="py-1 px-2 bg-gray-100 group-hover:text-gray-700 rounded">
                                            React Js
                                        </span>
                                    ))}
                                </div>
                            </Alert>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:mt-16">
                    <Link href="/testimonials" title="" className="pb-2 text-base font-bold leading-7 text-primary transition-all duration-200 border-b-2 border-primary hover:border-primary/80 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-primary/80">
                        Voir toutes les Freelacers
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Freelancers;