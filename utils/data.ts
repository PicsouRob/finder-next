import { MenuData } from "@/types/globalTypes";

export const menuData: MenuData[] = [
    {
        title: "Freelancers",
        to: "/search/freelancers",
    },
    {
        title: "Touve un travail",
        to: "/search/jobs",
    },
    {
        title: "Contact",
        to: "/contact",
    },
];

export const substringDesc = (text: String): string => {
    if(text.length > 30) {
        return `${text.substring(0, 30)}...`;
    } else {
        return `${text}`;
    }
}

export type ContactData = {
    title: string,
    text: string,
    open: string,
}

export const contactData: ContactData[] = [
    {
        title: "Téléphone",
        text: "+1 809 429 8594",
        open: "",
    },
    {
        title: "E-mail",
        text: "finderht@gmail.com",
        open: "mailto:finderht@gmail.com?subject=Services&body=Salut Roberto",
    },
    {
        title: "Adresse",
        text: "102 Street Saint-Marc",
        open: "tel:+18094298594",
    },
];

interface ProfileSelectedOptionProps {
    index: number,
    title: string,
}

export const profileOptions: ProfileSelectedOptionProps[] = [
    {
        index: 0,
        title: "À propos",
    },
    {
        index: 1,
        title: "Projet",
    },
    {
        index: 2,
        title: "Travail Publié",
    },
    {
        index: 3,
        title: "Commentaire",
    },
    {
        index: 4,
        title: "Travail Qui peut m'interesser",
    },
];