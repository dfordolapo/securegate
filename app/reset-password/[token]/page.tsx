"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function ResetPasswordPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = use(params);

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };
    const strengthScore = getPasswordStrength(password);
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setMessage("");

        if (password.length < 8) {
            setMessage("Your new password needs to be at least 8 characters long.");
            setIsPending(false);
            return;
        }

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(data.message);
            setIsSuccess(true);
        } else {
            setMessage(data.error || "Something went wrong on our end. Please try again.");
        }
        setIsPending(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <Shield className="h-6 w-6 text-blue-500" />
                        <span className="text-lg font-semibold text-foreground">SecureGate</span>
                    </Link>
                </div>
                <form
                    onSubmit={handleResetPassword}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                    <h1 className="text-xl font-bold text-foreground">Choose new password</h1>
                    <p className="mt-1 text-sm text-muted">Must be at least 8 characters.</p>

                    <div className="mt-6">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {password && (
                            <div className="mt-2 flex flex-col gap-1">
                                <div className="flex gap-1 h-1 w-full">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-full w-1/4 rounded-full transition-colors ${
                                                strengthScore >= level
                                                    ? level <= 1 ? "bg-red-500" : level === 2 ? "bg-orange-500" : level === 3 ? "bg-yellow-500" : "bg-accent"
                                                    : "bg-border"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-muted text-right">
                                    {strengthLabels[strengthScore]}
                                </span>
                                <span className="text-[11px] text-muted leading-tight">
                                    Use 8+ characters with a mix of uppercase letters, numbers & symbols.
                                </span>
                            </div>
                        )}
                    </div>

                    {!isSuccess && (
                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-5 flex w-full items-center justify-center rounded-lg bg-blue-500 p-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                "Update password"
                            )}
                        </button>
                    )}

                    {message && (
                        <p className={`mt-3 text-center text-xs ${isSuccess ? "text-accent" : "text-red-400"}`}>
                            {message}
                        </p>
                    )}

                    {isSuccess && (
                        <Link
                            href="/login"
                            className="mt-5 flex w-full items-center justify-center rounded-lg bg-blue-500 p-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-600"
                        >
                            Go to Log in
                        </Link>
                    )}

                    {!isSuccess && (
                        <div className="mt-5 text-center">
                            <Link href="/login" className="text-xs text-muted transition-colors hover:text-neutral-300">
                                Back to log in
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
