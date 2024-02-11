import Link from 'next/link';
import {
    ArrowLeftIcon, ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ExpiredToken: React.FC = () => {
    return (
        <div className=" py-12 min-h-screen mx-auto flex flex-col gap-6 items-center justify-center">
            <div className=" space-y-6 max-w-3xl px-8 py-12">
                <ExclamationTriangleIcon className="h-12 w-12" />
                <h1 className="writespace-nowrap text-3xl font-bold leading-loose tracking-wide">Lien d&rsquo;accès expiré ou invalide</h1>
                <h1 className="">L&lsquo;activation de votre compte n&lsquo;est plus valide. Cela peut se produire si vous avez cliqué sur le lien de réinitialisation de votre mot de passe après une heure, votre lien d&lsquo;activation a expiré ou n&lsquo;est pas valide.</h1>
                
                <div className="pt-5">
                    <Link
                        href="/signin"
                        className="flex items-center justify-center gap-2"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <p className="">Retour a s&lsquo;inscrire</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ExpiredToken;