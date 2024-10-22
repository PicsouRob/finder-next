import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prisma.config";
import { signJwt } from "@/libs/jsonWebToken";
import { User } from "@/types/model";

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
            async authorize(credentials: any): Promise<any> {
                try {
                    if(!credentials.email || !credentials.password) {
                        throw new Error("Email ou mot de passe incorrecte!");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        }
                    }) as any;

                    if(!user) {
                        throw new Error("Il n'existe pas de compte associé à cette adresse e-mail.");
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
                } catch (error: any) {
                    console.log(`Erreur: ${error.message}`);

                    throw new Error(error.message);
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
                    response_type: "code",
                    scope: "openid email profile"
                }
            },
            async profile(profile): Promise<any> {
                try {
                    const isUserExist: any = await prisma.user.findUnique({
                        where: {
                            email: profile?.email,
                        }
                    }) as User;

                    const userProfile = {
                        id: isUserExist?.id! || "",
                        name: profile.name,
                        email: profile.email,
                        avatar: profile.picture,
                    }

                    if (!isUserExist) {
                        const hashedPassword: string = await bcrypt.hash(userProfile.id, 10);
                        
                        const newUser = await prisma.user.create({
                            data: {
                                name: userProfile.name,
                                email: userProfile.email,
                                avatar: userProfile.avatar,
                                password: hashedPassword
                            }
                        });
                        
                        userProfile.id = newUser.id;
                    }

                    let isNewUser: boolean = !isUserExist;

                    return { ...userProfile, isNewUser };
                } catch(error) {
                    console.log("Error checking if user exists: ", error);

                    return NextResponse.json(
                        JSON.stringify({
                            message: `Il s'est passé un problème: ${error}`,
                    }), { status: 500 });
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                return true;
            }

            return true;
        },

        async redirect({ url, baseUrl }) {
            return baseUrl
        },

        async jwt({ token, user, account, profile }: any) {
            if(account) {
                token.accessToken = account.access_token;
            }
            
            if (user) {
                token.accessToken = user.jwtUserId;
                token.isNewUser = user.isNewUser || false;
                token.avatar = user.avatar || "";
                token.id = token.sub;
            }

            return token;
        },
        async session({ session, token }: any) {
            if(session?.user) {
                session.user = token;
            }

            return session;
        },
    },
};