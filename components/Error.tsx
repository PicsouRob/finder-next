import React from 'react';

interface ErrorProps {
    text: string
}

const Error: React.FC<ErrorProps> = ({ text }) => {
    return (
        <div className="text-cente mt-3 px-4 py-2 bg-red-500 text-white text-[14px] transition duration-200 rounded-sm">
            {text}
        </div>
    );
}

export default Error;