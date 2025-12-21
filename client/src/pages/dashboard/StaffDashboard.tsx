import { Layout } from '@/components/layout/Layout';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffDashboard() {
  const { user, issues } = useStore();
  
  // Issues assigned to this staff member
  const assignedIssues = issues.filter(issue => issue.assignedTo === user?.id);
  const pendingIssues = assignedIssues.filter(i => i.status !== 'resolved');

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">Staff Dashboard</h1>
          <p className="text-muted-foreground">Manage your assigned tasks and update statuses.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-foreground/90">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingIssues.length}</div>
              <p className="text-xs text-primary-foreground/70 mt-1">Issues requiring attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assignedIssues.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Lifetime assignments</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
           <h2 className="text-xl font-semibold">Assigned Issues</h2>
           <IssueTable issues={assignedIssues} currentUserRole="staff" />
        </div>
      </div>
    </Layout>
  );
}
