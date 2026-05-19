import { UserPlus, Shield, MoreVertical } from "lucide-react";

export default function AccessControlPage() {
  const users = [
    { name: 'Alice Freeman', email: 'alice@securegate.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
    { name: 'Bob Smith', email: 'bob@securegate.com', role: 'Security Analyst', status: 'Active', lastActive: '2 hours ago' },
    { name: 'Charlie Davis', email: 'charlie@securegate.com', role: 'Viewer', status: 'Inactive', lastActive: '5 days ago' },
    { name: 'Diana Prince', email: 'diana@securegate.com', role: 'Admin', status: 'Active', lastActive: '1 day ago' },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Access Control</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage user roles, permissions, and access policies.</p>
        </div>
        <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="rounded-xl bg-card border border-border shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg text-accent">
               <Shield className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm font-medium text-foreground/60">Total Users</p>
               <p className="text-2xl font-bold text-foreground">24</p>
            </div>
         </div>
         <div className="rounded-xl bg-card border border-border shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-600">
               <Shield className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm font-medium text-foreground/60">Active Sessions</p>
               <p className="text-2xl font-bold text-foreground">18</p>
            </div>
         </div>
         <div className="rounded-xl bg-card border border-border shadow-sm p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-600">
               <Shield className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm font-medium text-foreground/60">Pending Invites</p>
               <p className="text-2xl font-bold text-foreground">3</p>
            </div>
         </div>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-base font-semibold leading-6 text-foreground">User Management</h3>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="text-sm px-3 py-1.5 border border-border rounded-md bg-background/50 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border/50">
            <thead className="bg-background/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Last Active</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border/50">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-foreground/60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-slate-50 text-slate-700 ring-slate-600/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/60">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-foreground/40 hover:text-foreground transition-colors">
                      <MoreVertical className="h-5 w-5" />
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
