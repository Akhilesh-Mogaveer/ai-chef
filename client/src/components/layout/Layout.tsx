import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useStore } from '@/lib/store';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useStore();
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
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
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
          <div className="w-full flex-1">
            <span className="font-semibold">Campus Connect</span>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
