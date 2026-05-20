import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: "We need both your reset token and a new password to continue." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Your new password needs to be at least 8 characters long." },
                { status: 400 }
            );
        }

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken) {
            return NextResponse.json(
                { error: "This reset link isn't valid. It may have already been used or might be incorrect." },
                { status: 400 }
            );
        }

        if (new Date() > resetToken.expires) {
            return NextResponse.json(
                { error: "This password reset link has expired. Please request a new one." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword },
        });

        await prisma.passwordResetToken.delete({
            where: { token },
        });

        return NextResponse.json(
            { message: "Your password has been updated. Head to the login page to sign in." },
            { status: 200 }
        );
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return NextResponse.json(
            { error: "Something went wrong while resetting your password. Please try again." },
            { status: 500 }
        );
    }
}
