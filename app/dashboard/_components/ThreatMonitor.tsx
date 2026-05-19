import { Activity } from "lucide-react";

export function ThreatMonitor() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold leading-6 text-foreground">Threat Monitor</h3>
          <p className="mt-1 max-w-2xl text-sm text-foreground/60">Live network anomaly detection.</p>
        </div>
        <Activity className="h-5 w-5 text-accent" />
      </div>
      <div className="p-6 flex flex-col justify-center h-[300px]">
        {/* Simple minimal bar chart representation using divs */}
        <div className="flex items-end justify-between h-48 w-full gap-2 px-2">
          {[30, 45, 25, 60, 40, 85, 35, 50, 20, 65, 45, 70, 30].map((height, i) => (
            <div key={i} className="w-full relative group h-full flex flex-col justify-end">
              <div 
                className={`w-full rounded-t-sm transition-all duration-300 ${
                  height > 75 ? 'bg-rose-500/80 hover:bg-rose-500' :
                  height > 50 ? 'bg-amber-500/80 hover:bg-amber-500' :
                  'bg-accent/40 hover:bg-accent/60'
                }`}
                style={{ height: `${height}%` }}
              ></div>
              {/* Tooltip mock */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {height} events
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t border-border/50 pt-4">
          <div>
            <div className="text-sm font-medium text-foreground/60">Peak</div>
            <div className="mt-1 text-lg font-semibold text-foreground">85/min</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground/60">Average</div>
            <div className="mt-1 text-lg font-semibold text-foreground">42/min</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground/60">Status</div>
            <div className="mt-1 text-lg font-semibold text-emerald-600">Stable</div>
          </div>
        </div>
      </div>
    </div>
  );
}
