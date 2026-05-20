import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "We need your email and a password to create an account." },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {


            // Delete any old verification tokens for this user
            await prisma.verificationToken.deleteMany({
                where: { identifier: email }
            });

            // Generate a new token
            const token = crypto.randomBytes(32).toString("hex");

            await prisma.verificationToken.create({
                data: {
                    identifier: email,
                    token,
                    expires: new Date(Date.now() + 1000 * 60 * 60),
                },
            });

            // Resend the email
            try {
                await sendVerificationEmail(email, token);
            } catch (error) {
                console.log("SIGNUP ERROR:", error);
            }
            console.log("EMAIL WOULD SEND HERE")
            return NextResponse.json(
                { message: "We've sent another verification email to your address.", user: existingUser },
                { status: 200 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = crypto.randomBytes(32).toString("hex");

        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token,
                expires: new Date(Date.now() + 1000 * 60 * 60),
            },
        });

        await sendVerificationEmail(email, token);

        return NextResponse.json(
            {
                message: "Your account has been created. Check your email to verify your address.",
                user,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("SIGNUP ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong while creating your account. Please try again." },
            { status: 500 }
        );
    }
}