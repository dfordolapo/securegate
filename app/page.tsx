"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          SecureGate
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Authentication & Security App
        </p>

        <div className="flex gap-4 justify-center">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-md border border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}