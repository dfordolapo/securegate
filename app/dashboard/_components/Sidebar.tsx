"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Shield, LayoutDashboard, ShieldAlert, Activity, UserCheck, Settings, LogOut, X } from "lucide-react";

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Threat Monitor', href: '/dashboard/threat-monitor', icon: ShieldAlert },
  { name: 'Activity Log', href: '/dashboard/activity-log', icon: Activity },
  { name: 'Access Control', href: '/dashboard/access-control', icon: UserCheck },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />
      )}
      <div className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-sidebar border-r border-border transform transition-transform duration-200 ease-in-out lg:relative lg:z-auto lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
          <Shield className="h-6 w-6 text-accent" />
          <span className="ml-3 text-base font-semibold text-sidebar-foreground">SecureGate</span>
          <button onClick={onClose} className="ml-auto lg:hidden text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-sidebar-foreground/60 hover:bg-foreground/5 hover:text-sidebar-foreground'
                }`}
              >
                <item.icon
                  className={`mr-3 h-4 w-4 shrink-0 ${
                    isCurrent ? 'text-blue-400' : 'text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4 space-y-3">
          {session?.user && (
            <div className="px-3">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{session.user.name || "User"}</p>
              <p className="text-xs text-sidebar-foreground/40 truncate">{session.user.email || ""}</p>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-sidebar-foreground/50 rounded-lg hover:bg-foreground/5 hover:text-sidebar-foreground transition-all"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
