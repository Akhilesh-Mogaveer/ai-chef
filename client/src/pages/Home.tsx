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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-heading text-slate-900 dark:text-white">
                    Better Campus, <br />
                    <span className="text-primary">Together.</span>
                  </h1>
                  <p className="max-w-[600px] text-slate-500 md:text-xl dark:text-slate-400">
                    Report maintenance issues, track their status, and help us keep our campus safe and beautiful. Real-time updates for students and staff.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="h-12 px-8">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[350px] bg-white rounded-xl shadow-2xl border p-6 flex flex-col gap-4 dark:bg-slate-900 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 border-b pb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AS</div>
                    <div>
                      <div className="font-semibold">Alice Student</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="ml-auto px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">In Progress</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Broken Projector in Room 302</h3>
                    <p className="text-sm text-muted-foreground">The projector keeps flickering and turning off during lectures. It's making it hard to follow the class.</p>
                  </div>
                  <div className="mt-auto flex gap-2">
                     <div className="bg-slate-100 px-3 py-1 rounded text-xs font-medium dark:bg-slate-800">IT Support</div>
                     <div className="bg-red-50 text-red-600 px-3 py-1 rounded text-xs font-medium dark:bg-red-900/20">High Priority</div>
                  </div>
                </div>
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
