import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { rateLimit } from "./rate-limit";

import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                const ip = "global";

                const allowed = await rateLimit(ip);

                if (!allowed) {
                    throw new Error(
                        "Too many login attempts. Please wait a moment and try again."
                    );
                }

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter both your email and password to log in.");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error("Invalid email or password. Please check your credentials and try again.");
                }

                const passwordMatch = await compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Invalid email or password. Please check your credentials and try again.");
                }

                if (!user.emailVerified) {
                    throw new Error("Please verify your email address before logging in. Check your inbox for the verification link.");
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
};