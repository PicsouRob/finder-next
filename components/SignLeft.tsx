import React from "react";
import Image from "next/image";

import signImages from "../public/images/workmodel.jpg";
import SignLeftInfo from "./SignLeftInfo";

const SignLeft: React.FC = () => {
    return (
        <div className="relative hidden h-full w-full bg-cover bg-no-repeat lg:block lg:flex-1 lg:self-start">
            <div className="absolute inset-0">
                <Image
                    width="0"
                    height="0"
                    className="h-full w-full object-cover object-top"
                    src={signImages}
                    alt="aside signin"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <div className="absolute bottom-16 mx-auto px-12 w-full">
                <div className="w-full xl:mx-auto xl:pr-24">
                    <h3 className="text-4xl max-w-[38rem] font-bold text-white">
                        Rejoignez plus de 35k+ Professionnels & <br className="hidden xl:block" />
                        Ambaucheurs
                    </h3>
                  
                    <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 w-full">
                        <SignLeftInfo text="Montrez vos compétences" />
                        <SignLeftInfo text="Trouver des emplois" />
                        <SignLeftInfo text="Poster vos Jobs" />
                        <SignLeftInfo text="Trouver des freelances" />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SignLeft;