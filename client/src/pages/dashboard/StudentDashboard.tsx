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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}. Here's an overview of your reports.</p>
          </div>
          <CreateIssueDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openIssues}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressIssues}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedIssues}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Reported Issues</h2>
            <TabsList>
              <TabsTrigger value="grid"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myIssues.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground bg-card rounded-lg border border-dashed">
                    You haven't reported any issues yet.
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
    </Layout>
  );
}
