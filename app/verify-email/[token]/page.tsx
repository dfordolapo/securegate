import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Shield } from "lucide-react";

export default async function VerifyEmailPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    let heading: string;
    let message: string;
    let linkHref: string;
    let linkText: string;
    let isError: boolean;

    try {
        const verificationToken =
            await prisma.verificationToken.findUnique({
                where: { token },
            });

        if (!verificationToken) {
            heading = "Invalid Link";
            message = "This verification link isn't valid. It may have already been used or has expired.";
            linkHref = "/signup";
            linkText = "Sign Up Again";
            isError = true;
        } else if (new Date() > verificationToken.expires) {
            heading = "Link Expired";
            message = "This verification link has expired. Sign up again to receive a fresh one.";
            linkHref = "/signup";
            linkText = "Sign Up Again";
            isError = true;
        } else {
            await prisma.user.update({
                where: {
                    email: verificationToken.identifier,
                },
                data: {
                    emailVerified: true,
                },
            });

            await prisma.verificationToken.delete({
                where: {
                    token,
                },
            });

            heading = "Email Verified!";
            message = "Your email has been verified. You're all set to log in.";
            linkHref = "/login";
            linkText = "Go to Login";
            isError = false;
        }
    } catch (error) {
        console.error("VERIFY EMAIL ERROR:", error);
        heading = "Something Went Wrong";
        message = "Something went wrong on our end. Please try signing up again.";
        linkHref = "/signup";
        linkText = "Sign Up Again";
        isError = true;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <Shield className="h-6 w-6 text-blue-500" />
                        <span className="text-lg font-semibold text-foreground">SecureGate</span>
                    </Link>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                    <h1 className={`text-xl font-bold ${isError ? "text-red-400" : "text-accent"}`}>
                        {heading}
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        {message}
                    </p>
                    <Link
                        href={linkHref}
                        className="mt-5 inline-flex rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-600"
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
