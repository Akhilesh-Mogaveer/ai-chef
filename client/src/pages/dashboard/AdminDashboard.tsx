import { Layout } from '@/components/layout/Layout';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Users, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { issues, users } = useStore();
  
  const totalIssues = issues.length;
  const unassignedIssues = issues.filter(i => !i.assignedTo && i.status !== 'resolved').length;
  const activeStaff = users.filter(u => u.role === 'staff').length;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Oversee all campus issues and manage staff assignments.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalIssues}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unassignedIssues}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStaff}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
           <h2 className="text-xl font-semibold">All Campus Issues</h2>
           <IssueTable issues={issues} currentUserRole="admin" />
        </div>
      </div>
    </Layout>
  );
}
