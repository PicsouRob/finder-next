import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import Link from 'next/link';

const RecentPostedJobs: React.FC = () => {
    const jobs = Array(6).fill(0);

    return (
        <div className='relative pt-20 pb-10 sm:pb-16 lg:pb-20'>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
                <div className="space-y-3">
                    <p className="uppercase text-sm">Devenir freelance</p>
                    <h2 className="font-bold text-2xl lg:text-3xl text-gray-700">Offres d&apos;emploi récemment publiées</h2>
                </div>

                <div className="pt-6 grid md:grid-cols-2 lg:grid-cols- xl:grid-cols-3 gap-y-6 sm:gap-x-5 md:gap-x-6">
                    {jobs.map((job, index) => (
                        <Link href="jobs/" key={index} className="rounded-md">
                            <Alert className='space-y-3 shadow-none hover:border-primary hover:bg-primary group hover:text-white transition ease-in-out duration-200'>
                                <AlertTitle className='grid gap-2'>
                                    <h1 className="font-semibold text-xl lg:text-xl text-gray-600 group-hover:text-white">Frontend Developer</h1>

                                    <p className="">Publié Par: Phanord Picsou Roberto</p>
                                    <span className="font-normal">Mardi 15 Octobre 2024</span>
                                </AlertTitle>

                                <AlertDescription>
                                    Remote - Plein temps - 8h-5h - $500Hr
                                </AlertDescription>

                                
                                <div className="flex items-center gap-3">
                                    {jobs.slice(0, 2).map((_, ind) => (
                                        <span key={ind} className="p-2 bg-gray-100 group-hover:text-gray-700 rounded">
                                            Developement
                                        </span>
                                    ))}
                                </div>
                            </Alert>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:mt-16">
                    <Link href="/testimonials" title="" className="pb-2 text-base font-bold leading-7 text-primary transition-all duration-200 border-b-2 border-primary hover:border-primary/80 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-primary/80">
                        Voir toutes les offres
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecentPostedJobs;