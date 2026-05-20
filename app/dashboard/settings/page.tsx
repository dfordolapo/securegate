"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted mt-0.5">Manage your platform preferences and configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-1">
          <div className="flex flex-col space-y-1">
            <div className="bg-blue-500/10 text-blue-400 px-3 py-2 text-sm font-medium rounded-lg cursor-default">General Profile</div>
            <div className="text-muted px-3 py-2 text-sm font-medium rounded-lg cursor-default">Security Settings</div>
            <div className="text-muted px-3 py-2 text-sm font-medium rounded-lg cursor-default">Notifications</div>
            <div className="text-muted px-3 py-2 text-sm font-medium rounded-lg cursor-default">API Keys</div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Profile Information</h3>
              <p className="mt-0.5 text-xs text-muted">Update your account details.</p>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-foreground">First name</label>
                  <div className="mt-1.5">
                    <input type="text" name="first-name" id="first-name" defaultValue="Admin" className="block w-full rounded-lg border border-border bg-background py-1.5 px-3 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-foreground">Last name</label>
                  <div className="mt-1.5">
                    <input type="text" name="last-name" id="last-name" defaultValue="User" className="block w-full rounded-lg border border-border bg-background py-1.5 px-3 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email address</label>
                <div className="mt-1.5">
                  <input type="email" name="email" id="email" defaultValue="admin@securegate.com" className="block w-full rounded-lg border border-border bg-background py-1.5 px-3 text-sm text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                </div>
              </div>
            </div>
            <div className="px-5 py-4 bg-background/30 border-t border-border flex justify-end items-center gap-3">
              <button type="button" className="text-sm font-medium text-muted hover:text-foreground transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-border">Cancel</button>
              <button type="submit" className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-blue-600">Save Changes</button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
             <div className="px-5 py-4 border-b border-border">
               <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
               <p className="mt-0.5 text-xs text-muted">Customize how the dashboard looks on your device.</p>
             </div>
             <div className="p-5">
                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-sm font-medium text-foreground">Theme Preference</h4>
                      <p className="text-xs text-muted mt-0.5">Currently using Dark Theme</p>
                   </div>
                   <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">Change Theme</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
