import { Layout } from '@/components/layout/Layout';
import { ReportIssueForm } from '@/components/issues/ReportIssueForm';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

export default function StaffDashboard() {
  const { user, issues } = useStore();
  
  const myReportedIssues = issues.filter(issue => issue.userId === user?.id);
  
  const inProgress = myReportedIssues.filter(i => i.status === 'in-progress').length;
  const resolved = myReportedIssues.filter(i => i.status === 'resolved').length;
  const submitted = myReportedIssues.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Report Issues</h1>
          <p className="text-muted-foreground mt-1">Submit and track campus issues</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Submitted</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submitted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <div className="h-2 w-2 rounded-full bg-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolved}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="report" className="w-full">
          <TabsList>
            <TabsTrigger value="report">Report an Issue</TabsTrigger>
            <TabsTrigger value="history">My Reports</TabsTrigger>
          </TabsList>

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
