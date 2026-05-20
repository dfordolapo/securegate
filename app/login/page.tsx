"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
            setIsPending(false);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form
                onSubmit={handleLogin}
                className="flex w-[350px] flex-col gap-4 rounded-xl bg-zinc-900 p-6"
            >
                <h1 className="text-2xl font-bold">Login</h1>

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

                <div className="flex justify-between items-center px-1">
                    <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Forgot your password?
                    </Link>
                </div>

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
                    {isPending ? "Logging in..." : "Login"}
                </button>

                {error && (
                    <p className="text-center text-red-400 text-sm">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}