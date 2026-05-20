import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold text-foreground">SecureGate</span>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} SecureGate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
