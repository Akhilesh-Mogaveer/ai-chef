import { Layout } from '@/components/layout/Layout';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { issues, users } = useStore();
  
  const studentIssues = issues.filter(i => users.find(u => u.id === i.userId && u.role === 'student'));
  const staffIssues = issues.filter(i => users.find(u => u.id === i.userId && u.role === 'staff'));
  
  const openIssues = issues.filter(i => i.status === 'open').length;
  const inProgressIssues = issues.filter(i => i.status === 'in-progress').length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">System Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor all campus issues from students and staff</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{issues.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All reported issues</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{openIssues}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgressIssues}</div>
              <p className="text-xs text-muted-foreground mt-1">Being handled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedIssues}</div>
              <p className="text-xs text-muted-foreground mt-1">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Issues Reported by Students</h2>
              <p className="text-sm text-muted-foreground mt-1">Campus issues submitted by students</p>
            </div>
            <IssueTable issues={studentIssues} currentUserRole="admin" />
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Issues Reported by Staff</h2>
              <p className="text-sm text-muted-foreground mt-1">Campus issues submitted by staff members</p>
            </div>
            <IssueTable issues={staffIssues} currentUserRole="admin" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
