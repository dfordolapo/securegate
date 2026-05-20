import { Monitor, Smartphone, Globe, Shield } from "lucide-react";

const activity = [
  { id: 1, user: 'Sarah Jenkins', action: 'Logged in from new device', time: '5m ago', icon: Monitor, status: 'info' as const },
  { id: 2, user: 'Admin System', action: 'Firewall rules updated', time: '1h ago', icon: Shield, status: 'success' as const },
  { id: 3, user: 'Unknown IP', action: 'Failed login attempt (3x)', time: '2h ago', icon: Globe, status: 'warning' as const },
  { id: 4, user: 'Mike Ross', action: 'Password changed successfully', time: '4h ago', icon: Smartphone, status: 'info' as const },
];

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Recent Security Activity</h3>
        <p className="text-xs text-muted mt-0.5">Real-time feed of events across the network.</p>
      </div>
      <div className="p-5">
        <ul role="list" className="space-y-5">
          {activity.map((item, itemIdx) => (
            <li key={item.id} className="relative flex gap-x-4">
              <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                <div className="w-px bg-border" />
              </div>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-card">
                <div className={`h-2 w-2 rounded-full ring-2 ring-card ${
                  item.status === 'warning' ? 'bg-red-500' :
                  item.status === 'success' ? 'bg-accent' :
                  'bg-blue-500'
                }`} />
              </div>
              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-border bg-background/30">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-sm leading-5 text-muted">
                    <span className="font-medium text-foreground">{item.user}</span>{' '}
                    {item.action}
                  </div>
                  <time className="flex-none py-0.5 text-xs leading-5 text-muted">{item.time}</time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
