import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white border-b border-border dark:bg-slate-950 dark:border-slate-800">
        <div className="container h-14 flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold text-base tracking-tight">Campus Connect</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-24 md:py-32 lg:py-40 border-b border-border bg-white dark:bg-slate-950 dark:border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-heading leading-tight">
                    Efficient Campus Issue Management
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Centralized platform for reporting and resolving campus maintenance issues. Real-time tracking keeps students informed and staff organized.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/login">
                  <Button size="lg" className="h-11 px-8">
                    Access Platform <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-11 px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full py-20 md:py-28 border-b border-border bg-slate-50 dark:bg-slate-900/30 dark:border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
                How It Works
              </h2>
              <p className="mt-2 text-muted-foreground">
                Simple workflow designed for your campus community
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Report Issues</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Students submit detailed issue reports with location, category, and priority levels.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Track Progress</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Real-time status updates keep everyone informed throughout the resolution process.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Manage Efficiently</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Staff and admins assign, prioritize, and resolve issues with a unified dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 md:py-28 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6 max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
              Ready to streamline campus operations?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join students and staff in creating a more responsive campus community.
            </p>
            <div className="pt-4">
              <Link href="/login">
                <Button size="lg" className="h-11 px-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800">
        <div className="container px-4 md:px-6 h-16 flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 Campus Connect. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#"><a className="hover:text-foreground transition-colors">Terms</a></Link>
            <Link href="#"><a className="hover:text-foreground transition-colors">Privacy</a></Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
