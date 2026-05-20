import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
            message = "This verification link is invalid or has already been used.";
            linkHref = "/signup";
            linkText = "Sign Up Again";
            isError = true;
        } else if (new Date() > verificationToken.expires) {
            heading = "Link Expired";
            message = "This verification link has expired. Please sign up again to receive a new one.";
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
            message = "Your email has been verified. You can now log in to your account.";
            linkHref = "/login";
            linkText = "Go to Login";
            isError = false;
        }
    } catch (error) {
        console.error("VERIFY EMAIL ERROR:", error);
        heading = "Something Went Wrong";
        message = "We encountered an unexpected issue. Please try signing up again.";
        linkHref = "/signup";
        linkText = "Sign Up Again";
        isError = true;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="flex w-[350px] flex-col gap-4 rounded-xl bg-zinc-900 p-6 text-center">
                <h1 className={`text-2xl font-bold ${isError ? "text-red-400" : "text-green-400"}`}>
                    {heading}
                </h1>
                <p className="text-sm text-zinc-300">
                    {message}
                </p>
                <Link
                    href={linkHref}
                    className="mt-4 rounded-md bg-white p-3 font-semibold text-black text-center"
                >
                    {linkText}
                </Link>
            </div>
        </div>
    );
}
