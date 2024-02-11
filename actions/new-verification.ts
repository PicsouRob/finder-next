"use server";

import jwt from 'jsonwebtoken';

export const newVerification = async (token: string): Promise<boolean> => {
    const secretKey = process.env.JWT_USER_ID_SECRET! as string;

    return new Promise<boolean>((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err) resolve(true);

            resolve(false);
        });
    });
}