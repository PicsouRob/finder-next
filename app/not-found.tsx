import Image from 'next/image';
import Link from 'next/link';

import notfound from "@/public/images/notfound.jpg";

const NotFound: React.FC = () => {
    return (
        <div
            className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 px-6 md:px-8"
        >
            <Image
                src={notfound}
                alt="error" 
                className="" 
                width="0" height="0"
            />
            
            <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Page non trouvée <br /> Erreur 404</h1>
                <div className="max-w-xl">
                    <p className="lg:text-xl">La page que vous recherchiez semble avoir été déplacée, supprimée ou n&apos;existe pas.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <LinkButton href="/" text="Retourner a l'accueil" haveBackground />
                    <LinkButton href="/" text="Visitez notre centre d'aide" />
                </div>
            </div>
        </div>
    );
}

interface LinkButtonProps {
    text: string,
    haveBackground?: boolean,
    href: string,
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, haveBackground, href }) => {
    return (
        <Link 
            href={href} 
            className={`${haveBackground && "bg-primary border-transparent text-white"} text-primary font-medium rounded-sm py-2 px-4 hover:opacity-90 border border-gray-300`}
        >
            {text}
        </Link>
    );
}

export default NotFound;