import { ShieldCheck, UserX, Clock } from "lucide-react";

export function AuthStatus() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border">
        <h3 className="text-base font-semibold leading-6 text-foreground">Authentication Health</h3>
        <p className="mt-1 max-w-2xl text-sm text-foreground/60">Overview of recent login activities.</p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center py-6">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[8px] border-emerald-500/20">
            <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-l-transparent border-b-transparent transform rotate-45 transition-transform duration-1000"></div>
            <div className="text-center z-10">
              <span className="text-3xl font-bold text-foreground">98%</span>
              <span className="block text-xs font-medium text-foreground/60 mt-1">Success</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 transition-colors hover:bg-background">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mr-3" />
              <span className="text-sm font-medium text-foreground">Successful Logins</span>
            </div>
            <span className="text-sm font-semibold text-foreground">1,245</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 transition-colors hover:bg-background">
            <div className="flex items-center">
              <UserX className="h-5 w-5 text-rose-500 mr-3" />
              <span className="text-sm font-medium text-foreground">Failed Attempts</span>
            </div>
            <span className="text-sm font-semibold text-foreground">24</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 transition-colors hover:bg-background">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-3" />
              <span className="text-sm font-medium text-foreground">Avg. Session</span>
            </div>
            <span className="text-sm font-semibold text-foreground">42m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
