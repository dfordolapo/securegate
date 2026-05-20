import { Resend } from "resend";
import VerificationEmail from "../emails/verification-email";
import PasswordResetEmail from "../emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const verificationLink =
        `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Verify your email",
        react: VerificationEmail({
            verificationLink,
        }),
    });
}

export async function sendPasswordResetEmail(
    email: string,
    token: string
) {
    const resetLink =
        `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Reset your password",
        react: PasswordResetEmail({
            resetLink,
        }),
    });
}