import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { prisma } from "@/libs/prisma.config";
import { signJwt } from "@/libs/jsonWebToken";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/signin",
        signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_USER_ID_SECRET,
    },
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProviders({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    if(!credentials.email || !credentials.password) {
                        throw new Error("Email ou mot de passe incorrecte!");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        }
                    });

                    if(!user) {
                        throw new Error("Email ou mot de passe incorrecte!, Veillez verifier vos donnees.");
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user?.password!);

                    if(!isMatch) {
                        throw new Error("Votre mot de passe est incorrecte!");
                    }

                    const jwtUserId: string = signJwt({
                        id: user.id
                    }, {
                        expiresIn: "30d",
                        noTimestamp: true,
                    });

                    const {
                        password, ...userWithoutPassword
                    } = user;

                    return { ...userWithoutPassword, jwtUserId };
                } catch(error) {
                    throw new Error(`${error}`);
                }
            },
        }),
        GoogleProvider({
            id: "google",
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile): Promise<any> {
                try {
                    const isUserExist: any = await prisma.user.findUnique({
                        where: {
                            email: profile?.email
                        }
                    });

                    const { password, ...existUserWithoutPass } = isUserExist;

                    if(!isUserExist) {
                        const newUser = await prisma.user.create({
                            data: {
                                name: profile.name,
                                email: profile.email,
                                picture: profile.picture,
                            }
                        });

                        const { password, ...newUserWithoutPass } = newUser;

                        return newUserWithoutPass;
                    }

                    return existUserWithoutPass;
                } catch(error) {
                    console.log("Error checking if user exists: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user, account }: any) {
            if(account) {
                token.accessToken = account.access_token;
            }

            if(user) {
                token.id = user.id;
                token.role = user.role;
                token.picture = user.picture;
                token.accessToken = user.jwtUserId;
            }

            return token;
        },
        async session({ session, token }: any) {
            if(session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.picture = token.picture;
                session.accessToken = token.accessToken || "";
            }

            return session;
        },
    },
};