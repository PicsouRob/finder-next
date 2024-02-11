import Image from 'next/image';

import brand1 from "@/public/images/b1.png";
import brand2 from "@/public/images/b2.png";
import brand3 from "@/public/images/b3.png";
import brand4 from "@/public/images/b4.png";
import brand5 from "@/public/images/b5.png";
import brand6 from "@/public/images/b6.png";

const Trusted: React.FC = () => {
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl px-6 mx-auto lg:px-8 py-16 space-y-6">
                <p className="text-center font-bold text-xl lg:text-2xl text-gray-800">La confiance des meilleurs au monde</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
                    <Image
                        width="0"
                        height="0"
                        src={brand1} alt="b1"
                        className=""
                    />
                    
                    <Image
                        width="0"
                        height="0"
                        src={brand2} alt="b2"
                        className=""
                    />
                    
                    <Image
                        width="0"
                        height="0"
                        src={brand3} alt="b3"
                        className=""
                    />
                    
                    <Image
                        width="0"
                        height="0"
                        src={brand4} alt="b4"
                        className=""
                    />
                    
                    <Image
                        width="0"
                        height="0"
                        src={brand5} alt="b5"
                        className=""
                    />
                    
                    <Image
                        width="0"
                        height="0"
                        src={brand6} alt="b6"
                        className=""
                    />
                </div>
            </div>
        </div>
    );
}

export default Trusted;