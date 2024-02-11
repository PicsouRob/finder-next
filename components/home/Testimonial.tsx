import { useState } from 'react';
import Image from 'next/image';

import { TestimonialData, testimonial } from '@/utils/testimonial';
import quote from "@/public/images/quote.png";

const Testimonial: React.FC = () => {
    const [ showText, setShowText ] = useState<number>(2);
    
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 mb-10 space-y-12">
                <div className="text-center space-y-3">
                    <h1 className="font-semibold text-3xl lg:text-4xl xl:text-5xl">Témoignages</h1>
                    <p className="text-base">Les témoignages de gens a propos de nous.</p>
                </div>
                
                <div className="flex flex-col items-center justify-center w-full lg:w-3/4 mx-auto">
                    <Image width="8" height="8" src={quote} alt="quote" className="h-6 w-8" />
                    
                    <div className="space-y-6 mt-4">
                        <div className="text-lg text-center space-y-6 ">
                            <p className="text-xl transition-all duration-300 ease-out">{testimonial[showText].text}</p>
                            <div className="transition-all duration-300 ease-in">
                                <h1 className="font-semibold">{testimonial[showText].name}</h1>
                                <p className="text-gray-500">{testimonial[showText].occupation}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-x-3 md:gap-x-5">
                            {testimonial.map(({ name, avatar }: TestimonialData, ind) => (
                                <div key={ind} className={`${showText === ind ? "border-green-500" : "border-transparent"} border-2 p-1 rounded-full cursor-pointer transition-all duration-300 ease-out`}
                                    onClick={() => setShowText(ind)}
                                >
                                    <Image width="0" height="0" src={avatar} alt={name} className="rounded-full h-12 w-12 md:h-20 md:w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;