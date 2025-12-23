import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import StudentDashboard from "@/pages/dashboard/StudentDashboard";
import StaffDashboard from "@/pages/dashboard/StaffDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import Analytics from "@/pages/dashboard/Analytics";
import IssueMap from "@/pages/dashboard/IssueMap";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
function initializeAnalytics() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXXXXX', {
      page_path: window.location.pathname,
    });
  }
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXXXXX', {
        page_path: location,
      });
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard/student" component={StudentDashboard} />
      <Route path="/dashboard/staff" component={StaffDashboard} />
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/analytics" component={Analytics} />
      <Route path="/dashboard/map" component={IssueMap} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
