import { ObjectId } from 'mongodb';
import { DateTime } from "next-auth/providers/kakao";

export type BlogData = {
    id?: ObjectId,
    email: string,
    text: string,
    title: string,
    images: string[],
    createByUserId?: string,
    createdAt?: DateTime,
    updatedAt?: DateTime
};

