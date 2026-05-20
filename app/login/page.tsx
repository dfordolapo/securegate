"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

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
            if (result.error === "CredentialsSignin") {
                setError("Invalid email or password. Please try again.");
            } else {
                setError(result.error);
            }
            setIsPending(false);
            return;
        }

        router.push("/dashboard");
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
                    onSubmit={handleLogin}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                    <h1 className="text-xl font-bold text-foreground">Log in</h1>
                    <p className="mt-1 text-sm text-muted">Welcome back to your dashboard.</p>

                    <div className="mt-6 space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder-neutral-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Link href="/forgot-password" className="text-xs text-muted transition-colors hover:text-neutral-300">
                            Forgot your password?
                        </Link>
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
                            "Log in"
                        )}
                    </button>

                    {error && (
                        <p className="mt-3 text-center text-xs text-red-400">{error}</p>
                    )}

                    <p className="mt-5 text-center text-xs text-muted">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-400 transition-colors hover:text-blue-300">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
