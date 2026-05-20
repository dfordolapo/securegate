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
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex flex-1 items-center justify-between px-6">
        <div className="flex flex-1">
          <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-foreground/40" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-full border border-border/50 bg-background/50 py-2 pl-10 pr-10 text-foreground placeholder:text-foreground/40 focus:bg-background focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm sm:leading-6 transition-all"
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
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/40 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {/* Search Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-card border border-border shadow-lg overflow-hidden py-2">
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
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background/80 transition-colors"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-foreground/60 text-center">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6 gap-4">
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${showNotifications ? 'bg-black/5 text-foreground' : 'text-foreground/60 hover:text-foreground hover:bg-black/5'}`}
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-card">
                2
              </span>
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-card border border-border shadow-lg overflow-hidden flex flex-col origin-top-right">
                <div className="px-4 py-3 border-b border-border bg-background/50 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  <button className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 border-b border-border/50 last:border-0 hover:bg-background/50 transition-colors cursor-pointer flex gap-3 ${notif.unread ? 'bg-accent/5' : ''}`}>
                      <div className={`mt-0.5 rounded-full p-1.5 h-fit ${
                        notif.type === 'critical' ? 'bg-rose-500/10 text-rose-500' :
                        notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        <notif.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-medium ${notif.unread ? 'text-foreground' : 'text-foreground/80'}`}>{notif.title}</p>
                          <span className="text-xs text-foreground/50 whitespace-nowrap ml-2">{notif.time}</span>
                        </div>
                        <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border bg-background/50 text-center hover:bg-background transition-colors cursor-pointer">
                  <button className="text-xs font-medium text-foreground/60 hover:text-foreground">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative ml-1" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-2 rounded-full p-1 pr-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${showProfileMenu ? 'bg-black/5' : 'hover:bg-black/5'}`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground">{session?.user?.name || "Admin"}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border shadow-lg overflow-hidden flex flex-col origin-top-right">
                <div className="px-4 py-3 border-b border-border bg-background/50">
                  <p className="text-sm font-medium text-foreground">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-foreground/60 truncate">{session?.user?.email || ""}</p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-background/80 transition-colors"
                  >
                    <User className="mr-3 h-4 w-4 text-foreground/60" />
                    Profile
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-background/80 transition-colors"
                  >
                    <SettingsIcon className="mr-3 h-4 w-4 text-foreground/60" />
                    Settings
                  </Link>
                </div>
                <div className="py-1 border-t border-border">
                  <button 
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
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
