"use client";

import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

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
            setMessage("Account created successfully!");
        } else {
            setMessage(data.error || "Something went wrong");
        }
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

                <button
                    type="submit"
                    className="rounded-md bg-white p-3 text-black font-semibold"
                >
                    Sign Up
                </button>

                {message && (
                    <p className="text-sm text-center">{message}</p>
                )}
            </form>
        </div>
    );
}