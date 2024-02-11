import { StaticImageData } from "next/image";

import avatar5 from "/public/avatar/5.jpg";
import avatar6 from "/public/avatar/6.jpg";
import avatar7 from "/public/avatar/7.jpg";
import avatar8 from "/public/avatar/8.jpg";
import avatar9 from "/public/avatar/9.jpg";

export type TestimonialData = {
    name: string,
    avatar: StaticImageData,
    text: string,
    occupation: string,
}

export const testimonial: TestimonialData[] = [
    {
        name: "Max Cajuste",
        avatar: avatar5,
        text: "J'avais besoin d'une Décorateur d'intérieur ponctuelle, et cette plateforme a été un véritable sauveur. J'ai trouvé un psychologue qualifié en peu de temps, et la flexibilité des freelancers a vraiment répondu à mes besoins.",
        occupation: "Gestionnaire",
    },
    {
        name: "Kristin Pierre-Louis",
        avatar: avatar6,
        text: "En tant qu'entrepreneur, j'ai souvent des collaborateurs temporaires pour des projets spécifiques. Cette plateforme m'a permis de trouver rapidement des psychologues freelancers compétents, contribuant ainsi au succès de mes initiatives.",
        occupation: "Entrepreneuse",
    },
    {
        name: "Geralda Francois",
        avatar: avatar7,
        text: "La possibilité de poster des jobs pour des freelancers a grandement simplifié ma recherche de services personnalisés. J'ai pu comparer les profils, les tarifs et les évaluations pour prendre une décision éclairée. Une ressource précieuse!.",
        occupation: "Responsable Marketing",
    },
    {
        name: "Francky Jr",
        avatar: avatar8,
        text: "Grâce à cette plateforme, j'ai trouvé le photographe idéal pour mon projet. Sa maîtrise de la lumière et son œil pour les détails ont créé des images qui dépassent toutes mes attentes. Un véritable artiste derrière l'objectif.",
        occupation: "Conception et Créativité",
    },
    {
        name: "Bryan Exantus",
        avatar: avatar9,
        text: "Travailler avec ce développeur freelance a été une expérience exceptionnelle. Sa communication transparente et ses compétences approfondies ont rendu le processus de développement fluide et efficace. Je suis reconnaissant de l'avoir trouvé ici.",
        occupation: "Coach sportif",
    },
];