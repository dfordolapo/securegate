"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, setIsPending] = useState(false);

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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setMessage("");

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("You're almost there! We've sent a verification link to your email.");
        } else {
            setMessage(data.error || "Something went wrong while creating your account. Please try again.");
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
                    onSubmit={handleSignup}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                    <h1 className="text-xl font-bold text-foreground">Create account</h1>
                    <p className="mt-1 text-sm text-muted">Get started with SecureGate.</p>

                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            "Create account"
                        )}
                    </button>

                    {message && (
                        <p className="mt-3 text-center text-xs text-muted">{message}</p>
                    )}

                    <p className="mt-5 text-center text-xs text-muted">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 transition-colors hover:text-blue-300">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
