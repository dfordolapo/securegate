import { prisma } from "@/lib/prisma";

export default async function VerifyEmail({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const verificationToken =
        await prisma.verificationToken.findUnique({
            where: { token },
        });

    if (!verificationToken) {
        return <div>Invalid token</div>;
    }

    if (new Date() > verificationToken.expires) {
        return <div>Token expired</div>;
    }

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

    return <div>Email verified successfully</div>;
}
