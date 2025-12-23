import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, CheckCircle2, Zap, Shield, BookOpen, Users, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container h-16 flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-800 transition-all">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">Campus Connect</span>
          </Link>
          <nav className="flex gap-2">
            <Link href="/login">
              <Button variant="default" size="sm" className="font-medium">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-40 lg:py-48">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-10">
                <div className="space-y-8">
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
                      Smart Campus Management
                    </p>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight text-foreground font-heading leading-tight">
                    Efficient Campus Issue Management
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                    Centralized platform for reporting and resolving campus maintenance issues. Real-time tracking keeps students informed and staff organized.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/login">
                    <Button size="lg" className="h-13 px-8 font-semibold text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-13 px-8 font-semibold text-base border-2 hover:bg-slate-50 dark:hover:bg-slate-900">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Stat Card */}
              {/* <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                        <span className="text-4xl font-black text-white">95%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">Issues Resolved</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Campus community</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="mb-20 text-center">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">FEATURES</p>
              <h2 className="text-5xl md:text-5xl font-black tracking-tight text-foreground font-heading">
                Everything You Need
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Comprehensive tools for managing campus issues efficiently
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: CheckCircle2,
                  title: "Report Issues",
                  desc: "Submit detailed issue reports with location, category, and priority levels with AI-powered categorization.",
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: Zap,
                  title: "Staff Management",
                  desc: "Staff members report issues and track their submissions with real-time status updates.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "Analytics Dashboard",
                  desc: "Admins oversee all campus issues, monitor status, and view comprehensive analytics.",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} className="group bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl hover:border-slate-300/50 dark:hover:border-slate-700/50 transition-all duration-300">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section className="w-full py-24 md:py-32 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=400&fit=crop"
                  alt="Campus Scene"
                  className="w-full h-auto rounded-3xl shadow-2xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 space-y-10">
                <div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">USER ROLES</p>
                  <h2 className="text-5xl md:text-5xl font-black tracking-tight text-foreground font-heading">
                    Built for Everyone
                  </h2>
                </div>

                {/* Roles List */}
                <div className="space-y-7">
                  {[
                    {
                      icon: BookOpen,
                      title: "Students",
                      desc: "Create and track issues, view status updates, and contribute to making the campus better.",
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: Users,
                      title: "Staff",
                      desc: "View assigned issues, update progress status, and mark issues as resolved upon completion.",
                      color: "from-amber-500 to-orange-600"
                    },
                    {
                      icon: Lock,
                      title: "Administrators",
                      desc: "Full oversight with analytics, staff assignment, priority management, and system administration.",
                      color: "from-red-500 to-pink-600"
                    }
                  ].map((role, idx) => {
                    const IconComponent = role.icon;
                    return (
                      <div key={idx} className="group flex gap-4 p-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all">
                        <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground mb-1">{role.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {role.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-black dark:via-blue-950 dark:to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-8 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-4 md:px-6 max-w-3xl text-center space-y-8 relative z-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-black tracking-tight font-heading">
                Ready to Improve Your Campus?
              </h2>
              <p className="text-xl text-blue-100">
                Join students and staff in creating a more responsive campus community. Start managing issues efficiently today.
              </p>
            </div>
            <div className="pt-6">
              <Link href="/login">
                <Button size="lg" className="h-13 px-10 font-semibold text-base bg-white text-blue-900 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6 h-16 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>© 2024 Campus Connect. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#"><a className="hover:text-foreground transition-colors font-medium">Terms</a></Link>
            <Link href="#"><a className="hover:text-foreground transition-colors font-medium">Privacy</a></Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
