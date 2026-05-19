"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, ShieldAlert, Activity, UserCheck, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Threat Monitor', href: '/dashboard/threat-monitor', icon: ShieldAlert },
  { name: 'Activity Log', href: '/dashboard/activity-log', icon: Activity },
  { name: 'Access Control', href: '/dashboard/access-control', icon: UserCheck },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-sidebar border-r border-sidebar/20 h-full shadow-lg z-20">
      <div className="flex h-16 shrink-0 items-center px-6">
        <ShieldAlert className="h-8 w-8 text-accent" />
        <span className="ml-3 text-xl font-semibold text-sidebar-foreground tracking-wide">SecureGate</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isCurrent
                    ? 'bg-accent/20 text-accent shadow-sm ring-1 ring-accent/20'
                    : 'text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                    isCurrent ? 'text-accent' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 mt-auto border-t border-white/5">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 rounded-lg hover:bg-white/5 hover:text-sidebar-foreground transition-all group"
        >
          <LogOut className="mr-3 h-5 w-5 text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80 transition-colors" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
