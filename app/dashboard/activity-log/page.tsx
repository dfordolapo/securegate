import { ActivityFeed } from "../_components/ActivityFeed";

export default function ActivityLogPage() {
  const logs = [
    { id: 1, event: 'User Login', user: 'admin@securegate.com', ip: '192.168.1.100', date: '2023-10-27 14:32:01', status: 'Success' },
    { id: 2, event: 'Firewall Rule Added', user: 'system_admin', ip: '10.0.0.5', date: '2023-10-27 14:15:22', status: 'Success' },
    { id: 3, event: 'Failed Authentication', user: 'unknown', ip: '45.22.19.8', date: '2023-10-27 13:45:10', status: 'Failure' },
    { id: 4, event: 'Password Reset Request', user: 'j.doe@company.com', ip: '192.168.1.15', date: '2023-10-27 11:20:05', status: 'Success' },
    { id: 5, event: 'API Key Generated', user: 'developer_01', ip: '10.0.0.12', date: '2023-10-27 09:10:45', status: 'Success' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Activity Log</h1>
        <p className="text-sm text-muted mt-0.5">Detailed history of system and user events.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card overflow-hidden h-full">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-sm font-semibold text-foreground">Detailed Event Logs</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border/50">
                <thead className="bg-background/30">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Event</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">IP Address</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date/Time</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-background/30 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-foreground">{log.event}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-foreground/80">{log.user}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-muted">{log.ip}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-muted">{log.date}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          log.status === 'Success' ? 'bg-accent/10 text-accent ring-accent/30' : 'bg-red-500/10 text-red-400 ring-red-500/30'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
