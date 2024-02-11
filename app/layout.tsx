import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
// import { useRouter } from 'next/navigation';

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NextAuthProvider from './Providers';

const poppins = Poppins({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
  title: 'Finder',
  description: 'Finder, app to help users find frelancer for jobs...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
    }) {
    // const router = useRouter();
    // const showHeader = router.pa === '/login' ? false : true;
    
    return (
        <html lang="en">
            <body className={poppins.className}>
                <NextAuthProvider>
                    <Header />
                    <main>
                            {children}
                    </main>
                        <Footer />
                </NextAuthProvider>
            </body>
        </html>
    );
}