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
    type: string
}

interface CompletedSignupProps {

    type: string,
    icon: string,
}

export const completedSignupUserType: CompletedSignupProps[] = [
    {
        type: "Freelancer",
        icon: "https://finder.app/images/icons/freelancer.svg"
    },
    {
        type: "Ambaucheur",
        icon: "https://finder.app/images/icons/ambaucher.svg"
    },
];