import { DateTime } from "next-auth/providers/kakao"

export type UserProps = {
    id: string,
    name: string,
    email: string,
    password: string,
    phone?: string,
    picture?: string,
    facebook?: string,
    instagram?: string,
    description?: string,
    websiteLink?: string,
    location?: string,
    updatedAt?: DateTime,
    createdAt?: DateTime,
}

export type SignInData = {
    email: string,
    password: string,
}

export type ResetPasswordProps = {
    confirmPassword: string,
    password: string,
}

export interface AuthenticateValuesData extends SignInData {
    name: string,
}

export interface ResetPasswordEmailTemplateProps {
    name: string,
    url: string,
    email: string,
    year?: number
}