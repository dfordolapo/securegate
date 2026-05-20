import { Resend } from "resend";
import VerificationEmail from "../emails/verification-email";
import PasswordResetEmail from "../emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const verificationLink =
        `${process.env.NEXTAUTH_URL}/verify-email/${token}`;

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
        `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    console.log("[RESEND] Sending password reset email to:", email);
    console.log("[RESEND] Reset link:", resetLink);

    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Reset your password",
        react: PasswordResetEmail({
            resetLink,
        }),
    });

    if (error) {
        console.error("[RESEND] Error sending password reset email:", error);
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }

    console.log("[RESEND] Password reset email sent successfully:", data);
}