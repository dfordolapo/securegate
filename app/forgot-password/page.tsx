"use client";

import { useState } from "react";
import Link from "next/link";

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
            setMessage(data.error || "We encountered an unexpected issue. Please try again.");
        }
        setIsPending(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form
                onSubmit={handleForgotPassword}
                className="flex w-[350px] flex-col gap-4 rounded-xl bg-zinc-900 p-6"
            >
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-sm text-zinc-400">Enter your email address and we'll send you a link to reset your password.</p>

                <input
                    type="email"
                    placeholder="Email"
                    className="rounded-md bg-zinc-800 p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

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
                    {isPending ? "Sending link..." : "Send Reset Link"}
                </button>

                {message && (
                    <p className="text-center text-sm text-zinc-300">
                        {message}
                    </p>
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
