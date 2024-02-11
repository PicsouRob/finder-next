import React from "react";

import Logo from "./Logo";
import ConnectWithGoogle from "./ConnectWithGoogle";
import { SignInTopProps } from "@/types/globalTypes";

const SignTop: React.FC<SignInTopProps> = ({ title, text }) => {
    return (
        <div className="text-center">
            <Logo />
            <h1
                className="writespace-nowrap text-3xl font-bold leading-loose tracking-wide"
            >
                {title}
            </h1>
            
            <span
                className="font-light text-gray-500"
            >
                {text}
            </span>

            <ConnectWithGoogle />
        </div>
    );
}

export default SignTop;
