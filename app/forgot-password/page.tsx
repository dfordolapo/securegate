"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setMessage("");

        const res = await fetch("/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(data.message);
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
                    onSubmit={handleForgotPassword}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                    <h1 className="text-xl font-bold text-foreground">Reset password</h1>
                    <p className="mt-1 text-sm text-muted">
                        Enter your email and we&apos;ll send you a reset link.
                    </p>

                    <div className="mt-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

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
                            "Send reset link"
                        )}
                    </button>

                    {message && (
                        <p className="mt-3 text-center text-xs text-muted">{message}</p>
                    )}

                    <div className="mt-5 text-center">
                        <Link href="/login" className="text-xs text-muted transition-colors hover:text-muted">
                            Back to log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
