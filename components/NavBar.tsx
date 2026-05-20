"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Shield className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            SecureGate
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-blue-600"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
