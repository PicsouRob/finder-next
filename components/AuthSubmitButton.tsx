import React from 'react';

type AuthSubmitButton = {
    text: string,
    isLoading: boolean,
}

const AuthSubmitButton: React.FC<AuthSubmitButton> = ({ text, isLoading }) => {
    return (
        <div className="pt-6">
            <button
                className="py-4 w-full text-white bg-primary rounded-md hover:opacity-90 focus:ring-4 focus:ring-gray-100 focus:outline-none h-12 flex items-center gap-3 justify-center font-medium"
                type="submit"
            >
                <p className="">{isLoading ? "Patientez..." : text}</p>
                {isLoading && (<div
                    className="h-4 w-4 rounded-full border-l-2 border-t-2 border-white border-right-secondary animate-spin"
                />)}
            </button>
        </div>
    );
}

export default AuthSubmitButton;