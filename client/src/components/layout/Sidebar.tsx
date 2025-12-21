import { Link, useLocation } from 'wouter';
import { useStore, UserRole } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ListTodo, 
  BarChart3, 
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useStore();

  if (!user) return null;

  const links = [
    { 
      href: '/dashboard/student', 
      label: 'My Reports', 
      icon: ListTodo, 
      roles: ['student'] 
    },
    { 
      href: '/dashboard/staff', 
      label: 'Tasks', 
      icon: LayoutDashboard, 
      roles: ['staff'] 
    },
    { 
      href: '/dashboard/admin', 
      label: 'Overview', 
      icon: BarChart3, 
      roles: ['admin'] 
    },
    { 
      href: '/dashboard/analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      roles: ['admin'] 
    },
  ];

  const filteredLinks = links.filter(link => link.roles.includes(user.role));

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-950 text-slate-50 border-r border-slate-800">
      <div className="flex h-14 items-center border-b border-slate-800 px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span>Campus Connect</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
          <div className="mb-4 px-2 py-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="h-8 w-8 rounded-full bg-slate-700"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-medium text-sm">{user.name}</span>
                <span className="truncate text-xs opacity-60 capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="px-2 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-slate-300 hover:bg-slate-900 hover:text-slate-50"
                )}>
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-slate-800 p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-slate-50 hover:border-slate-700"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
