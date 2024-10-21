import React from 'react';
import { ShieldAlert } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ErrorProps {
    text: string,
    title?: string,
}

const Error: React.FC<ErrorProps> = ({ text, title }) => {
    return (
        <Alert className='text-red-700 border-red-300'>
            <ShieldAlert className='size-4 file-700 stroke-red-700' />

            <AlertTitle>{title}</AlertTitle>

            <AlertDescription className='text-sm'>{text}</AlertDescription>
        </Alert>
    );
}

export default Error;