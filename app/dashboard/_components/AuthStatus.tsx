import { ShieldCheck, UserX, Clock } from "lucide-react";

export function AuthStatus() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Authentication Health</h3>
        <p className="text-xs text-muted mt-0.5">Overview of recent login activities.</p>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-center py-6">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-accent/20">
            <div className="absolute inset-0 rounded-full border-[6px] border-accent border-l-transparent border-b-transparent transform rotate-45 transition-transform duration-1000"></div>
            <div className="text-center z-10">
              <span className="text-2xl font-bold text-foreground">98%</span>
              <span className="block text-xs font-medium text-muted mt-0.5">Success</span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50 transition-colors hover:bg-background/50">
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 text-accent mr-3" />
              <span className="text-sm text-muted">Successful Logins</span>
            </div>
            <span className="text-sm font-semibold text-foreground">1,245</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50 transition-colors hover:bg-background/50">
            <div className="flex items-center">
              <UserX className="h-4 w-4 text-red-400 mr-3" />
              <span className="text-sm text-muted">Failed Attempts</span>
            </div>
            <span className="text-sm font-semibold text-foreground">24</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50 transition-colors hover:bg-background/50">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-400 mr-3" />
              <span className="text-sm text-muted">Avg. Session</span>
            </div>
            <span className="text-sm font-semibold text-foreground">42m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
