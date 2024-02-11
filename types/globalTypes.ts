export type MenuData = {
    title: string,
    to: string,
}

export type CategoriesData = {
    title: string,
    icon: React.ReactNode,
}

export interface SignInTopProps {
    title: string,
    text: string,
}

export interface ContactInput {
    name: string,
    email: string,
    message: string,
}