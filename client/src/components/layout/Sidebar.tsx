import { Link, useLocation } from 'wouter';
import { useStore, UserRole } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  BarChart3, 
  LogOut, 
  ShieldAlert,
  GraduationCap,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useStore();

  if (!user) return null;

  const links = [
    { 
      href: '/dashboard/student', 
      label: 'My Issues', 
      icon: ListTodo, 
      roles: ['student'] 
    },
    { 
      href: '/dashboard/staff', 
      label: 'Assigned Issues', 
      icon: ListTodo, 
      roles: ['staff'] 
    },
    { 
      href: '/dashboard/admin', 
      label: 'All Issues', 
      icon: ShieldAlert, 
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
    <div className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6" />
          <span className="">Campus Connect</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <div className="mb-4 px-2 py-2">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2 text-sidebar-accent-foreground">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="h-8 w-8 rounded-full bg-background"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs opacity-70 capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="px-2 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Menu
          </div>
          
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-muted-foreground hover:bg-sidebar-accent/50"
                )}>
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
