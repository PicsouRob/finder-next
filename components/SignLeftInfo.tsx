import React from 'react';

interface SignLeftInfoProps {
    text: string,
}

const SignLeftInfo: React.FC<SignLeftInfoProps> = ({ text }) => {
    return (
        <li className="flex items-center space-x-3">
            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <svg
                    className="h-3.5 w-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </div>
            
            <span className="text-lg font-medium text-white">
                {" "}
                {text}{" "}
            </span>
        </li>
    );
}

export default SignLeftInfo;