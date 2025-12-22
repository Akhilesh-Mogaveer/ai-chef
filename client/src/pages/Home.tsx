import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, CheckCircle2, Zap, Shield, BookOpen, Users, Lock } from 'lucide-react';

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
        <section className="w-full py-20 md:py-32 lg:py-40 border-b border-border bg-white dark:bg-slate-950 dark:border-slate-800">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-heading leading-tight">
                    Efficient Campus Issue Management
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Centralized platform for reporting and resolving campus maintenance issues. Real-time tracking keeps students informed and staff organized.
                  </p>
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

              {/* Hero Image with Stat */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1564629238117-45e9d194e19f?w=500&h=600&fit=crop"
                    alt="Campus Building"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  {/* Stat Badge */}
                  <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <span className="text-xl font-bold text-green-600 dark:text-green-400">95%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Issues Resolved</p>
                        <p className="text-xs text-muted-foreground">Campus community</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Everything You Need */}
        <section className="w-full py-20 md:py-28 border-b border-border bg-slate-50 dark:bg-slate-900/30 dark:border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
                Everything You Need
              </h2>
              <p className="mt-2 text-muted-foreground">
                Comprehensive tools for managing campus issues efficiently
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-4 p-6 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Report Issues</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Submit detailed issue reports with location, category, and priority levels with AI-powered categorization.
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-6 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Staff Management</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Staff members report issues and track their submissions with real-time status updates.
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-6 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Analytics Dashboard</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Admins oversee all campus issues, monitor status, and view comprehensive analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Everyone */}
        <section className="w-full py-20 md:py-28 border-b border-border bg-white dark:bg-slate-950 dark:border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
                Built for Everyone
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-4 p-8 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Students</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Report campus issues and track their status in real-time with AI-powered categorization.
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-8 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Staff</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Report and track issues, manage maintenance operations with priority-based workflow.
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-8 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
                  <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Administrators</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Monitor all campus issues, analyze trends, and maintain system oversight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 md:py-28 bg-slate-900 dark:bg-black text-white">
          <div className="container px-4 md:px-6 max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
              Ready to Improve Your Campus?
            </h2>
            <p className="text-lg text-slate-300">
              Join students and staff in creating a more responsive campus community. Start managing issues efficiently today.
            </p>
            <div className="pt-4">
              <Link href="/login">
                <Button size="lg" className="h-11 px-8 bg-white text-slate-900 hover:bg-slate-100">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 dark:bg-black text-slate-400">
        <div className="container px-4 md:px-6 h-16 flex items-center justify-between text-sm">
          <p>© 2024 Campus Connect. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#"><a className="hover:text-white transition-colors">Terms</a></Link>
            <Link href="#"><a className="hover:text-white transition-colors">Privacy</a></Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
