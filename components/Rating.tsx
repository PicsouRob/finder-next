"use client";

import { StarIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface RatingProps {
    rateValue: number,
}

const Rating: React.FC<RatingProps> = ({ rateValue }) => {
    const generatedArray = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <ul className="flex items-center gap-1">
            {generatedArray.map((num, index) => (
                    <li key={index} className="">
                    <StarIcon className={`${num <= rateValue && "fill-yellow-500"} stroke-yellow-500 h-6 w-6`} />
                    </li>
            ))}
        </ul>
    );
}

export default Rating