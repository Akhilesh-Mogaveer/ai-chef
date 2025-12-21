import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Analytics() {
  const { issues } = useStore();

  // Process data for charts
  const statusData = [
    { name: 'Open', value: issues.filter(i => i.status === 'open').length, color: 'hsl(221, 83%, 53%)' }, // Primary
    { name: 'In Progress', value: issues.filter(i => i.status === 'in-progress').length, color: 'hsl(43, 96%, 64%)' }, // Amber/Yellowish
    { name: 'Resolved', value: issues.filter(i => i.status === 'resolved').length, color: 'hsl(173, 58%, 39%)' }, // Green/Teal
  ];

  const categoryCounts: Record<string, number> = {};
  issues.forEach(issue => {
    categoryCounts[issue.category] = (categoryCounts[issue.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const priorityData = [
     { name: 'Low', count: issues.filter(i => i.priority === 'low').length },
     { name: 'Medium', count: issues.filter(i => i.priority === 'medium').length },
     { name: 'High', count: issues.filter(i => i.priority === 'high').length },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights into campus maintenance trends and issue resolution.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Status Distribution</CardTitle>
              <CardDescription>Current state of all reported issues</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>Breakdown of report types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

           {/* Priority Breakdown */}
           <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Issues by Priority</CardTitle>
              <CardDescription>Volume of issues by urgency level</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="count" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
