import Image from 'next/image';
import Link from 'next/link';

import notfound from "@/public/images/notfound.jpg";
import Header from '@/components/nav/Header';
import Footer from '@/components/commons/Footer';

const NotFound: React.FC = () => {
    return (
        <div className="">
            <Header />

            <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 md:px-8 py-12 md:py-24">
                <div className="space-y-4 grid place-items-center text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-700 font-bold">404 <br /> Oops&apos;s Page non trouvée</h1>
                    
                    <div className="max-w-xl">
                        <p className="text-base">La page que vous recherchiez semble avoir été déplacée, supprimée ou n&apos;existe pas.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <LinkButton href="/" text="Retourner a l'accueil" haveBackground />
                        <LinkButton href="/" text="Visitez notre centre d'aide" />
                    </div>
                </div>

                <Image
                    src={notfound}
                    alt="error" 
                    className="" 
                    width="0" height="0"
                />
            </div>

            <Footer />
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