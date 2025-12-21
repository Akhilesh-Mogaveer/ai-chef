import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useStore } from '@/lib/store';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useStore();
  const [location] = useLocation();

  // If no user and not on public pages, show children (which will likely handle redirect or be the login page)
  const isPublicPage = location === '/' || location === '/login';

  if (!user && !isPublicPage) {
     // Ideally, we'd redirect here, but let the pages handle auth checks for cleaner logic
  }

  if (isPublicPage) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-slate-950 border-slate-800 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white border-slate-200 px-4 lg:h-[60px] lg:px-6 dark:bg-slate-950 dark:border-slate-800 justify-between">
          <div className="flex items-center gap-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <span className="font-semibold">Campus Connect</span>
          </div>

          {user && (
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex flex-col overflow-hidden text-right hidden sm:block">
                  <span className="truncate font-medium text-sm">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => logout()}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sign out</span>
              </Button>
            </div>
          )}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50 dark:bg-slate-900/30">
          {children}
        </main>
      </div>
    </div>
  );
}
