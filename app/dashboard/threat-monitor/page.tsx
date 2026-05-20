import { ThreatMonitor } from "../_components/ThreatMonitor";
import { ShieldAlert, AlertCircle, AlertTriangle } from "lucide-react";

export default function ThreatMonitorPage() {
  const activeThreats = [
    { id: 'TH-001', type: 'DDoS Attempt', source: '192.168.1.105', severity: 'High', time: '10 mins ago', status: 'Mitigated' },
    { id: 'TH-002', type: 'SQL Injection', source: '45.33.12.90', severity: 'Critical', time: '25 mins ago', status: 'Blocked' },
    { id: 'TH-003', type: 'Unauthorized Access', source: '10.0.0.42', severity: 'Medium', time: '1 hour ago', status: 'Investigating' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="text-center lg:text-left">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Threat Monitor</h1>
        <p className="text-sm text-muted mt-0.5">Real-time threat detection and anomaly monitoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ThreatMonitor />
        </div>
        <div className="lg:col-span-1 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 h-full">
             <h3 className="text-sm font-semibold text-foreground mb-4">Threat Summary</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-muted">Critical</span>
                   </div>
                   <span className="text-sm font-bold text-foreground">2</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-muted">Warning</span>
                   </div>
                   <span className="text-sm font-bold text-foreground">14</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-muted">Notice</span>
                   </div>
                   <span className="text-sm font-bold text-foreground">45</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Active Incidents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border/50">
            <thead className="bg-background/30">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">ID</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Source IP</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Severity</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Time</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {activeThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-background/30 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-foreground">{threat.id}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-foreground/80">{threat.type}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-muted">{threat.source}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      threat.severity === 'Critical' ? 'bg-red-500/10 text-red-400 ring-red-500/30' :
                      threat.severity === 'High' ? 'bg-orange-500/10 text-orange-400 ring-orange-500/30' :
                      'bg-amber-500/10 text-amber-400 ring-amber-500/30'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-muted">{threat.time}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-foreground/80">{threat.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
