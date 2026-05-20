"use client";

import { use, useState } from "react";
import Link from "next/link";

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
    const strengthColors = ["bg-zinc-700", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setMessage("");

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters.");
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
            setMessage(data.error || "We encountered an unexpected issue. Please try again.");
        }
        setIsPending(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form
                onSubmit={handleResetPassword}
                className="flex w-[350px] flex-col gap-4 rounded-xl bg-zinc-900 p-6"
            >
                <h1 className="text-2xl font-bold">Choose New Password</h1>

                <input
                    type="password"
                    placeholder="New Password"
                    className="rounded-md bg-zinc-800 p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {password && (
                    <div className="flex flex-col gap-1 px-1">
                        <div className="flex gap-1 h-1.5 w-full">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-full w-1/4 rounded-full transition-colors ${
                                        strengthScore >= level ? strengthColors[strengthScore] : "bg-zinc-700"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-zinc-400 text-right">
                            {strengthLabels[strengthScore]}
                        </span>
                        <span className="text-[11px] text-zinc-500 leading-tight">
                            Use 8+ characters with a mix of uppercase letters, numbers & symbols.
                        </span>
                    </div>
                )}

                {!isSuccess && (
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex justify-center items-center rounded-md bg-white p-3 font-semibold text-black disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isPending ? "Updating password..." : "Update Password"}
                    </button>
                )}

                {message && (
                    <p className={`text-center text-sm ${isSuccess ? "text-green-400" : "text-red-400"}`}>
                        {message}
                    </p>
                )}

                {isSuccess && (
                    <Link href="/login" className="rounded-md bg-white p-3 font-semibold text-black text-center">
                        Go to Login
                    </Link>
                )}

                <div className="text-center mt-2">
                    <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
