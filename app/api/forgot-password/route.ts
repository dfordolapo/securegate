import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Please enter your email address so we can help you reset your password." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // We don't want to reveal whether a user exists or not for security reasons.
        // If the user exists, we generate a token and send an email.
        if (user) {
            // Delete old tokens
            await prisma.passwordResetToken.deleteMany({
                where: { email },
            });

            const token = crypto.randomBytes(32).toString("hex");

            await prisma.passwordResetToken.create({
                data: {
                    email,
                    token,
                    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
                },
            });

            await sendPasswordResetEmail(email, token);
        }

        return NextResponse.json(
            { message: "If we have an account with that email, you'll receive a password reset link shortly." },
            { status: 200 }
        );
    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        return NextResponse.json(
            { error: "Something went wrong on our end. Please try again." },
            { status: 500 }
        );
    }
}
