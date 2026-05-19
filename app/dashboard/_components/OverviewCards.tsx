import { ShieldAlert, Users, Server, AlertTriangle } from "lucide-react";

const stats = [
  { name: 'Active Threats', value: '3', change: '+2', changeType: 'negative', icon: ShieldAlert },
  { name: 'Total Users', value: '2,845', change: '+12%', changeType: 'positive', icon: Users },
  { name: 'System Status', value: 'Healthy', change: '99.9% Uptime', changeType: 'neutral', icon: Server },
  { name: 'Failed Logins', value: '142', change: '-14%', changeType: 'positive', icon: AlertTriangle },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm p-6 transition-all hover:shadow-md hover:border-accent/30"
        >
          <dt>
            <div className="absolute rounded-lg bg-accent/10 p-3">
              <item.icon className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-foreground/60">{item.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
            <p className="text-2xl font-semibold text-foreground">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-medium ${
                item.changeType === 'positive'
                  ? 'text-emerald-600'
                  : item.changeType === 'negative'
                  ? 'text-rose-600'
                  : 'text-foreground/50'
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}
