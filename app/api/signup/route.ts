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
                { error: "Missing email or password" },
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
            await sendVerificationEmail(email, token);

            return NextResponse.json(
                { message: "Verification email resent successfully", user: existingUser },
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
                message: "User created successfully",
                user,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("SIGNUP ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}