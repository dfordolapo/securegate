import { UserPlus, Shield, MoreVertical } from "lucide-react";

export default function AccessControlPage() {
  const users = [
    { name: 'Alice Freeman', email: 'alice@securegate.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
    { name: 'Bob Smith', email: 'bob@securegate.com', role: 'Security Analyst', status: 'Active', lastActive: '2 hours ago' },
    { name: 'Charlie Davis', email: 'charlie@securegate.com', role: 'Viewer', status: 'Inactive', lastActive: '5 days ago' },
    { name: 'Diana Prince', email: 'diana@securegate.com', role: 'Admin', status: 'Active', lastActive: '1 day ago' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Access Control</h1>
          <p className="text-sm text-muted mt-0.5">Manage user roles, permissions, and access policies.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-blue-600">
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
               <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
               <p className="text-xs text-muted">Total Users</p>
               <p className="text-xl font-bold text-foreground">24</p>
            </div>
         </div>
         <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
               <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
               <p className="text-xs text-muted">Active Sessions</p>
               <p className="text-xl font-bold text-foreground">18</p>
            </div>
         </div>
         <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
               <Shield className="h-5 w-5 text-amber-400" />
            </div>
            <div>
               <p className="text-xs text-muted">Pending Invites</p>
               <p className="text-xl font-bold text-foreground">3</p>
            </div>
         </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground">User Management</h3>
          <input
            type="text"
            placeholder="Search users..."
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder-neutral-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border/50">
            <thead className="bg-background/30">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Last Active</th>
                <th className="relative px-5 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-background/30 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-medium text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-foreground/80">{user.role}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      user.status === 'Active' ? 'bg-accent/10 text-accent ring-accent/30' : 'bg-neutral-500/10 text-neutral-400 ring-neutral-500/30'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-muted">{user.lastActive}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-muted hover:text-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
