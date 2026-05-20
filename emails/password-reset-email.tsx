export default function PasswordResetEmail({
    resetLink,
}: {
    resetLink: string;
}) {
    return (
        <div>
            <h1>Reset your password</h1>
            <p>
                Click the link below to reset your password. If you didn't request this, you can safely ignore this email.
            </p>
            <a href={resetLink}>
                Reset Password
            </a>
        </div>
    );
}
