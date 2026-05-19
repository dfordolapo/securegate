interface VerificationEmailProps {
    name: string;
    verificationLink: string;
}

export default function VerificationEmail({
    name,
    verificationLink,
}: VerificationEmailProps) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "40px",
                background: "#f4f4f5",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                }}
            >
                <h1>Verify Your Email</h1>

                <p>Hello {name},</p>

                <p>
                    Please verify your email address to activate
                    your SecureGate account.
                </p>

                <a
                    href={verificationLink}
                    style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "12px 20px",
                        background: "#18181b",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                    }}
                >
                    Verify Email
                </a>

                <p
                    style={{
                        marginTop: "20px",
                        fontSize: "14px",
                        color: "#71717a",
                    }}
                >
                    This verification link expires in 15 minutes.
                </p>
            </div>
        </div>
    );
}