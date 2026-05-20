import { Activity } from "lucide-react";

export function ThreatMonitor() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Threat Monitor</h3>
          <p className="text-xs text-muted mt-0.5">Live network anomaly detection.</p>
        </div>
        <Activity className="h-4 w-4 text-blue-500" />
      </div>
      <div className="p-5 flex flex-col justify-center h-[300px]">
        <div className="flex items-end justify-between h-48 w-full gap-2 px-2">
          {[30, 45, 25, 60, 40, 85, 35, 50, 20, 65, 45, 70, 30].map((height, i) => (
            <div key={i} className="w-full relative group h-full flex flex-col justify-end">
              <div
                className={`w-full rounded-t-sm transition-all duration-300 ${
                  height > 75 ? 'bg-red-500/70 hover:bg-red-500' :
                  height > 50 ? 'bg-amber-500/70 hover:bg-amber-500' :
                  'bg-blue-500/30 hover:bg-blue-500/50'
                }`}
                style={{ height: `${height}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-neutral-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-neutral-700">
                {height} events
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4 text-center border-t border-border/50 pt-4">
          <div>
            <div className="text-xs text-muted">Peak</div>
            <div className="mt-0.5 text-sm font-semibold text-foreground">85/min</div>
          </div>
          <div>
            <div className="text-xs text-muted">Average</div>
            <div className="mt-0.5 text-sm font-semibold text-foreground">42/min</div>
          </div>
          <div>
            <div className="text-xs text-muted">Status</div>
            <div className="mt-0.5 text-sm font-semibold text-accent">Stable</div>
          </div>
        </div>
      </div>
    </div>
  );
}
