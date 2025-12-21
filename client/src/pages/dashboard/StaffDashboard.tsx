import { Layout } from '@/components/layout/Layout';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffDashboard() {
  const { user, issues } = useStore();
  
  // Issues assigned to this staff member
  const assignedIssues = issues.filter(issue => issue.assignedTo === user?.id);
  const pendingIssues = assignedIssues.filter(i => i.status !== 'resolved');
  const resolvedIssues = assignedIssues.filter(i => i.status === 'resolved');

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Assigned Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your work queue and update issue status</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingIssues.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Needs your attention</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedIssues.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assignedIssues.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Assigned Issues</h2>
          <IssueTable issues={assignedIssues} currentUserRole="staff" />
        </div>
      </div>
    </Layout>
  );
}
