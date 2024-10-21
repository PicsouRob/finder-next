import React from "react";

import { SignInTopProps } from "@/types/globalTypes";
import Logo from "../commons/Logo";
import ConnectWithGoogle from "./ConnectWithGoogle";

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
                className="font-light text-gray-500 text-sm"
            >
                {text}
            </span>

            <ConnectWithGoogle />
        </div>
    );
}

export default SignTop;
