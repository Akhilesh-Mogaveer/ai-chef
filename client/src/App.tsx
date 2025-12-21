import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/dashboard/StudentDashboard";
import StaffDashboard from "@/pages/dashboard/StaffDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import Analytics from "@/pages/dashboard/Analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard/student" component={StudentDashboard} />
      <Route path="/dashboard/staff" component={StaffDashboard} />
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
