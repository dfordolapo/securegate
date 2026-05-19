export default function VerificationEmail({
    verificationLink,
}: {
    verificationLink: string;
}) {
    return (
        <div>
            <h1>Verify your email</h1>

            <p>
                Click the link below to verify your account.
            </p>

            <a href={verificationLink}>
                Verify Email
            </a>
        </div>
    );
}
