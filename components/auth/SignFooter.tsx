import React from 'react';

const SignFooter: React.FC = () => {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    
    return (
        <div className="space-y-2 text-sm justify-between items-center pt-10 text-center whitespace-nowrap">
            <span
                className="flex-1 text-gray-500"
            >
                © {year} Finder. Tous droits réservés
            </span>
            
            <span
                className="flex flex-col md:flex-row justify-center items-center space-x-1 space-y-2 md:space-y-0 mx-auto"
            >
                <span
                    className="text-gray-500 hover:text-teal-600"
                >
                    Conditions d&apos;utilisation
                </span>
    
                <span
                    className="hidden md:flex text-gray-500"
                >
                    &#183;
                </span>
                
                <span
                    className="text-gray-500 hover:text-teal-600"
                >
                    Politique de confidentialité
                </span>
            </span>
        </div>
    );
}

export default SignFooter;