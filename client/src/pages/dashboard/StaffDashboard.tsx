import { Layout } from '@/components/layout/Layout';
import { ReportIssueForm } from '@/components/issues/ReportIssueForm';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function StaffDashboard() {
  const { user, issues } = useStore();
  
  // Issues assigned to this staff member
  const assignedIssues = issues.filter(issue => issue.assignedTo === user?.id);
  const myReportedIssues = issues.filter(issue => issue.userId === user?.id);
  
  const pendingAssigned = assignedIssues.filter(i => i.status !== 'resolved').length;
  const resolvedAssigned = assignedIssues.filter(i => i.status === 'resolved').length;
  const mySubmitted = myReportedIssues.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-1">Report issues and manage your assigned tasks</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reported</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mySubmitted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <div className="h-2 w-2 rounded-full bg-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingAssigned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedAssigned}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList>
            <TabsTrigger value="assigned">Assigned Tasks</TabsTrigger>
            <TabsTrigger value="report">Report an Issue</TabsTrigger>
            <TabsTrigger value="history">My Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="mt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Your Assigned Issues</h2>
                <p className="text-sm text-muted-foreground mt-1">Update status and manage assigned work</p>
              </div>
              <IssueTable issues={assignedIssues} currentUserRole="staff" />
            </div>
          </TabsContent>

          <TabsContent value="report" className="mt-6">
            <ReportIssueForm />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Issues You Reported</h2>
                <p className="text-sm text-muted-foreground mt-1">Track issues you've reported to the system</p>
              </div>
              <IssueTable issues={myReportedIssues} currentUserRole="staff" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
