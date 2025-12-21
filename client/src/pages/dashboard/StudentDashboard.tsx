import { Layout } from '@/components/layout/Layout';
import { CreateIssueDialog } from '@/components/issues/CreateIssueDialog';
import { IssueCard } from '@/components/issues/IssueCard';
import { IssueTable } from '@/components/issues/IssueTable';
import { useStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, List } from 'lucide-react';

export default function StudentDashboard() {
  const { user, issues } = useStore();
  
  // Filter issues reported by this student
  const myIssues = issues.filter(issue => issue.userId === user?.id);
  
  const openIssues = myIssues.filter(i => i.status === 'open').length;
  const inProgressIssues = myIssues.filter(i => i.status === 'in-progress').length;
  const resolvedIssues = myIssues.filter(i => i.status === 'resolved').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading">My Reports</h1>
            <p className="text-muted-foreground mt-1">Track your campus issue reports and their status</p>
          </div>
          <CreateIssueDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{openIssues}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgressIssues}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedIssues}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Issues</h2>
            <Tabs defaultValue="grid" className="w-auto">
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="grid" size="sm"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
                <TabsTrigger value="list" size="sm"><List className="h-4 w-4" /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Tabs defaultValue="grid" className="w-full mt-0">
            <TabsContent value="grid" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myIssues.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No issues reported yet
                  </div>
                ) : (
                  myIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <IssueTable issues={myIssues} currentUserRole="student" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
