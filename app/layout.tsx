import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import NextAuthProvider from './Providers';
import { Toaster } from '@/components/ui/toaster';
import UserSession from './UserSession';

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
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <UserSession>
            <Toaster />

            {children}
          </UserSession>
        </NextAuthProvider>
      </body>
    </html>
  );
}