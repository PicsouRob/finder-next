import Image from 'next/image';

import slide61 from "@/public/images/workmodel.jpg";

const FindLink: React.FC = () => {
    return (
        <div className="max-w-7xl px-6 mx-auto lg:px-8 my-12">
            <div className="bg-primary rounded-lg overflow-hidden  p-8 md:p-16">
                <div className="flex flex-col md:flex-row items-center relative h-full gap-6 md:gap-10">
                    <div className="space-y-5 text-white h-full">
                        <h1 className="text-3xl font-semibold">
                            Trouvez les talents nécessaires pour faire croître votre entreprise.
                        </h1>
                        
                        <p className="text-[17px] text-gray-300">Annoncez vos offres d&apos;emploi à des millions d&apos;utilisateurs mensuels et recherchez 15,8 millions de CV</p>
                        
                        <button className="bg-white rounded-md font-medium text-[14px] text-black py-3 hover:opacity-90 px-5">
                            <span>Commencer</span>
                        </button>
                    </div>
                    
                    <Image 
                        width="400" height="400" 
                        src={slide61} 
                        alt="slider62"
                        className="rounded-lg shadow"
                    />
                </div>
            </div>
        </div>
    );
}

export default FindLink;