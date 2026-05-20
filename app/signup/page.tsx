"use client";

import { useState } from "react";

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
    const strengthColors = ["bg-zinc-700", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
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
            setMessage(data.error || "We encountered an unexpected issue while creating your account. Please try again.");
        }
        setIsPending(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form
                onSubmit={handleSignup}
                className="flex w-[350px] flex-col gap-4 rounded-xl bg-zinc-900 p-6"
            >
                <h1 className="text-2xl font-bold">Create Account</h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="rounded-md bg-zinc-800 p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="rounded-md bg-zinc-800 p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="rounded-md bg-zinc-800 p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <button
                    type="submit"
                    disabled={isPending}
                    className="flex justify-center items-center rounded-md bg-white p-3 text-black font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : null}
                    {isPending ? "Signing up..." : "Sign Up"}
                </button>

                {message && (
                    <p className="text-sm text-center">{message}</p>
                )}
            </form>
        </div>
    );
}