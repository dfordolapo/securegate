"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, X, CheckCircle2, AlertTriangle, ShieldAlert, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const mockNotifications = [
  { id: 1, title: 'New Device Detected', desc: 'A new Mac was logged in from Austin, TX.', time: '5m ago', icon: AlertTriangle, unread: true, type: 'warning' },
  { id: 2, title: 'Firewall Updated', desc: 'Rules for inbound traffic were applied.', time: '1h ago', icon: CheckCircle2, unread: true, type: 'success' },
  { id: 3, title: 'Threat Blocked', desc: 'Prevented a SQL injection on /api/auth.', time: '2h ago', icon: ShieldAlert, unread: false, type: 'critical' },
];

const navigationItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Threat Monitor', href: '/dashboard/threat-monitor' },
  { name: 'Activity Log', href: '/dashboard/activity-log' },
  { name: 'Access Control', href: '/dashboard/access-control' },
  { name: 'Settings', href: '/dashboard/settings' },
];

export function TopNav() {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = navigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 bg-card border-b border-border">
      <div className="flex flex-1 items-center justify-between px-6">
        <div className="flex flex-1">
          <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-sm text-foreground placeholder-neutral-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Search dashboard..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-card shadow-lg overflow-hidden py-2">
                {filteredItems.length > 0 ? (
                  <ul className="max-h-60 overflow-auto">
                    {filteredItems.map(item => (
                      <li key={item.href}>
                        <button
                          onClick={() => {
                            router.push(item.href);
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background transition-colors"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted text-center">
                    No results found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ml-4 flex items-center gap-4">
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative rounded-lg p-2 transition-colors outline-none ${showNotifications ? 'bg-foreground/5 text-foreground' : 'text-muted hover:text-foreground hover:bg-foreground/5'}`}
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-accent-foreground shadow-sm ring-2 ring-card">
                2
              </span>
              <Bell className="h-4 w-4" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-lg overflow-hidden flex flex-col origin-top-right">
                <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 border-b border-border/50 last:border-0 hover:bg-background transition-colors cursor-pointer flex gap-3 ${notif.unread ? 'bg-blue-500/5' : ''}`}>
                      <div className={`mt-0.5 rounded-lg p-1.5 h-fit ${
                        notif.type === 'critical' ? 'bg-red-500/10 text-red-400' :
                        notif.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-accent/10 text-accent'
                      }`}>
                        <notif.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-medium ${notif.unread ? 'text-foreground' : 'text-foreground/80'}`}>{notif.title}</p>
                          <span className="text-xs text-muted whitespace-nowrap ml-2">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted mt-1 line-clamp-2">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border text-center hover:bg-background transition-colors cursor-pointer">
                  <button className="text-xs font-medium text-muted hover:text-foreground">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-2 rounded-lg p-1.5 pr-3 transition-colors outline-none ${showProfileMenu ? 'bg-foreground/5' : 'hover:bg-foreground/5'}`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-foreground">{session?.user?.name || "Admin"}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-lg overflow-hidden flex flex-col origin-top-right">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-muted truncate">{session?.user?.email || ""}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-background transition-colors"
                  >
                    <User className="mr-3 h-4 w-4 text-muted" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-background transition-colors"
                  >
                    <SettingsIcon className="mr-3 h-4 w-4 text-muted" />
                    Settings
                  </Link>
                </div>
                <div className="py-1 border-t border-border">
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
