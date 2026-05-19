import { OverviewCards } from "./_components/OverviewCards";
import { ThreatMonitor } from "./_components/ThreatMonitor";
import { ActivityFeed } from "./_components/ActivityFeed";
import { AuthStatus } from "./_components/AuthStatus";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Security Dashboard</h1>
        <p className="text-sm text-foreground/60 mt-1">Monitor, analyze, and protect your infrastructure.</p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatMonitor />
        </div>
        <div className="lg:col-span-1">
          <AuthStatus />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}