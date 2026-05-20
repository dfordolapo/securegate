import { ShieldAlert, Users, Server, AlertTriangle } from "lucide-react";

const stats = [
  { name: 'Active Threats', value: '3', change: '+2', changeType: 'negative' as const, icon: ShieldAlert },
  { name: 'Total Users', value: '2,845', change: '+12%', changeType: 'positive' as const, icon: Users },
  { name: 'System Status', value: 'Healthy', change: '99.9% Uptime', changeType: 'neutral' as const, icon: Server },
  { name: 'Failed Logins', value: '142', change: '-14%', changeType: 'positive' as const, icon: AlertTriangle },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-neutral-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <item.icon className="h-4 w-4 text-blue-500" />
            </div>
            <span
              className={`text-xs font-medium ${
                item.changeType === 'positive'
                  ? 'text-accent'
                  : item.changeType === 'negative'
                  ? 'text-red-400'
                  : 'text-muted'
              }`}
            >
              {item.change}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-semibold text-foreground">{item.value}</p>
            <p className="text-xs text-muted mt-0.5">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
