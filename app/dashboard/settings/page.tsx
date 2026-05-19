export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-foreground/60 mt-1">Manage your platform preferences and configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-1">
          <nav className="flex flex-col space-y-1">
            <a href="#" className="bg-accent/10 text-accent px-3 py-2 text-sm font-medium rounded-md">General Profile</a>
            <a href="#" className="text-foreground/70 hover:bg-background hover:text-foreground px-3 py-2 text-sm font-medium rounded-md transition-colors">Security Settings</a>
            <a href="#" className="text-foreground/70 hover:bg-background hover:text-foreground px-3 py-2 text-sm font-medium rounded-md transition-colors">Notifications</a>
            <a href="#" className="text-foreground/70 hover:bg-background hover:text-foreground px-3 py-2 text-sm font-medium rounded-md transition-colors">API Keys</a>
          </nav>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-base font-semibold leading-6 text-foreground">Profile Information</h3>
              <p className="mt-1 text-sm text-foreground/60">Update your account details.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-foreground">First name</label>
                  <div className="mt-2">
                    <input type="text" name="first-name" id="first-name" defaultValue="Admin" className="block w-full rounded-md border border-border bg-background/50 py-1.5 px-3 text-foreground shadow-sm focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm sm:leading-6 outline-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-foreground">Last name</label>
                  <div className="mt-2">
                    <input type="text" name="last-name" id="last-name" defaultValue="User" className="block w-full rounded-md border border-border bg-background/50 py-1.5 px-3 text-foreground shadow-sm focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm sm:leading-6 outline-none" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">Email address</label>
                <div className="mt-2">
                  <input type="email" name="email" id="email" defaultValue="admin@securegate.com" className="block w-full rounded-md border border-border bg-background/50 py-1.5 px-3 text-foreground shadow-sm focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm sm:leading-6 outline-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-background/50 border-t border-border flex justify-end items-center gap-3">
              <button type="button" className="text-sm font-medium leading-6 text-foreground hover:text-foreground/80 transition-colors px-4 py-2 rounded-md border border-transparent hover:border-border/50 hover:bg-background">Cancel</button>
              <button type="submit" className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground transition-colors">Save Changes</button>
            </div>
          </div>
          
          <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
             <div className="p-6 border-b border-border">
               <h3 className="text-base font-semibold leading-6 text-foreground">Appearance</h3>
               <p className="mt-1 text-sm text-foreground/60">Customize how the dashboard looks on your device.</p>
             </div>
             <div className="p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-sm font-medium text-foreground">Theme Preference</h4>
                      <p className="text-sm text-foreground/60">Currently using Hybrid Light Theme</p>
                   </div>
                   <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">Change Theme</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
