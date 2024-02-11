import React from "react";

import Logo from "./Logo";
import { ResetPasswordEmailTemplateProps } from "@/types/user";
import SocialMedia from "./SocialMedia";

const ResetPasswordEmailTemplate: React.FC<ResetPasswordEmailTemplateProps> = ({ name, url, email }) => {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    
    return (
        <div className="bg-gray-100 flex flex-col gap-4 justify-center items-center space-y-4 mx-auto px-8 py-12 text-gray-700">
            {/* <Logo /> */}
            
            <div className="bg-white flex flex-col gap-5 justify-center items-center text-center p-12 max-w-2xl">
                <h2 className="font-bold text-[17px]">
                    Salut! {name}, Quelqu&apos;un demande que le mot de passe soit réinitialisé pour le compte suivant.
                </h2>
                <p className="">
                    Pour réinitialiser votre mot de passe, visitez l&apos;adresse suivante.
                </p>
                <a href={url} target="_blanc" className="bg-primary text-white px-6 py-2.5">
                    Réinitialiser votre mot de passe
                </a>
                <p className="">Votre email adresse: <span className="text-blue-500">{email}</span></p>
                
                <p className="">S&apos;il s&apos;agit d&apos;une erreur, ignorez simplement cet e-mail et rien ne se passera</p>
            </div>
            
            <SocialMedia color="#000" />
            <p className="">Copyright © {year} - All Rights Reserved</p>
        </div>
    );
}

export default ResetPasswordEmailTemplate;