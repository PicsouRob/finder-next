import { StaticImageData } from "next/image";

import blog1 from "@/public/images/blog1.jpg";
import blog2 from "@/public/images/blog12.jpg";
import blog3 from "@/public/images/blog2.jpg";
import blog4 from "@/public/images/blog3.jpg";

export type BlogData = {
    id: string,
    image: StaticImageData,
    date: string,
    title: string,
    text: string,
}

export const blogData: BlogData[] = [
    {
        id: "ec4e1388-7576-498f-bae3-9aacc0c17da5",
        date: "03 Fevrier 2023",
        image: blog1,
        title: "Explorer certaines des villes et des services à domicile.",
        text: "Apporter la culture du partage à tous.",
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174001",
        date: "03 Fevrier 2023",
        image: blog2,
        title: "Explorer certaines des villes et des services à domicile.",
        text: "Apporter la culture du partage à tous.",
    },
    {
        id: "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
        date: "03 Fevrier 2023",
        image: blog3,
        title: "Explorer certaines des villes et des services à domicile.",
        text: "Apporter la culture du partage à tous.",
    },
    {
        id: "98765432-10ab-cdef-0123-456789abcdef",
        date: "03 Fevrier 2023",
        image: blog4,
        title: "Explorer certaines des villes et des services à domicile.",
        text: "Apporter la culture du partage à tous.",
    },
];