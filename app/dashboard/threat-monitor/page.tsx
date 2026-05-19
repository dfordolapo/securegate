import { ThreatMonitor } from "../_components/ThreatMonitor";
import { ShieldAlert, AlertCircle, AlertTriangle } from "lucide-react";

export default function ThreatMonitorPage() {
  const activeThreats = [
    { id: 'TH-001', type: 'DDoS Attempt', source: '192.168.1.105', severity: 'High', time: '10 mins ago', status: 'Mitigated' },
    { id: 'TH-002', type: 'SQL Injection', source: '45.33.12.90', severity: 'Critical', time: '25 mins ago', status: 'Blocked' },
    { id: 'TH-003', type: 'Unauthorized Access', source: '10.0.0.42', severity: 'Medium', time: '1 hour ago', status: 'Investigating' },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Threat Monitor</h1>
        <p className="text-sm text-foreground/60 mt-1">Real-time threat detection and anomaly monitoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatMonitor />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl bg-card border border-border shadow-sm p-6 h-full">
             <h3 className="text-base font-semibold text-foreground mb-4">Threat Summary</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-rose-500" />
                      <span className="text-sm font-medium">Critical</span>
                   </div>
                   <span className="text-sm font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium">Warning</span>
                   </div>
                   <span className="text-sm font-bold">14</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">Notice</span>
                   </div>
                   <span className="text-sm font-bold">45</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-base font-semibold leading-6 text-foreground">Active Incidents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border/50">
            <thead className="bg-background/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Source IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border/50">
              {activeThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{threat.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{threat.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground/60">{threat.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      threat.severity === 'Critical' ? 'bg-rose-50 text-rose-700 ring-rose-600/20' :
                      threat.severity === 'High' ? 'bg-orange-50 text-orange-700 ring-orange-600/20' :
                      'bg-amber-50 text-amber-700 ring-amber-600/20'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/60">{threat.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{threat.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
