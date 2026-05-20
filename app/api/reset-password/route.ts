import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken) {
            return NextResponse.json(
                { error: "Invalid password reset token." },
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
            { message: "Your password has been successfully updated. You can now log in." },
            { status: 200 }
        );
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return NextResponse.json(
            { error: "We encountered an unexpected issue while resetting your password. Please try again." },
            { status: 500 }
        );
    }
}
