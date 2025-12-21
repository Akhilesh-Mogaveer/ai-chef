import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <GraduationCap className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">Campus Connect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-white border-b dark:bg-slate-950 dark:border-slate-900">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/10 dark:border-primary/40">
                  <span>Streamline Campus Operations</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-heading">
                  Issue Reporting and Resolution, Simplified
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  A centralized platform for students to report campus issues and for administrators to manage and resolve them efficiently. Real-time updates keep everyone informed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login">
                  <Button size="lg" className="h-11 px-8 font-medium">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-11 px-8 font-medium">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-heading">How It Works</h2>
                <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                  Simple, transparent, and efficient issue tracking for everyone on campus.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Report</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Easily submit issues with photos and location details directly from your device.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800">
                <div className="p-3 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/20">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Track</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Follow the progress of your report in real-time as staff pick it up.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Resolve</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Staff resolve issues efficiently, keeping the campus running smoothly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 Campus Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#"><a className="text-xs hover:underline underline-offset-4">Terms of Service</a></Link>
          <Link href="#"><a className="text-xs hover:underline underline-offset-4">Privacy</a></Link>
        </nav>
      </footer>
    </div>
  );
}
