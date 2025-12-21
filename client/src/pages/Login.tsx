import { useState } from 'react';
import { useLocation } from 'wouter';
import { useStore, UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Lock, Mail, Badge, AlertCircle } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useStore();
  const { toast } = useToast();
  
  // Student form
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  // Staff form
  const [staffEmail, setStaffEmail] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  
  // Admin form
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!studentEmail || !studentPassword) {
        setError('Email and password are required');
        setIsLoading(false);
        return;
      }
      login(studentEmail, 'student');
      setIsLoading(false);
      
      toast({
        title: "Welcome!",
        description: `Logged in as Student`,
      });
      setLocation('/dashboard/student');
    }, 1000);
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!staffEmail || !staffId || !staffPassword) {
        setError('Email, Staff ID, and password are required');
        setIsLoading(false);
        return;
      }
      
      // Validate staff ID format (mock validation)
      if (!/^S\d{5}$/.test(staffId)) {
        setError('Invalid Staff ID format. Use format: S##### (e.g., S12345)');
        setIsLoading(false);
        return;
      }
      
      login(staffEmail, 'staff');
      setIsLoading(false);
      
      toast({
        title: "Welcome!",
        description: `Logged in as Staff (${staffId})`,
      });
      setLocation('/dashboard/staff');
    }, 1000);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!adminEmail || !adminPassword || !adminKey) {
        setError('Email, password, and admin key are required');
        setIsLoading(false);
        return;
      }
      
      // Validate admin key
      if (adminKey !== 'ADMIN2024') {
        setError('Invalid admin key. Please check and try again.');
        setIsLoading(false);
        return;
      }
      
      login(adminEmail, 'admin');
      setIsLoading(false);
      
      toast({
        title: "Welcome Administrator!",
        description: `System access granted`,
      });
      setLocation('/dashboard/admin');
    }, 1000);
  };

  const fillStudentCredentials = () => {
    setStudentEmail('alice@campus.edu');
    setStudentPassword('student123');
  };

  const fillStaffCredentials = () => {
    setStaffEmail('bob@campus.edu');
    setStaffId('S12345');
    setStaffPassword('staff123');
  };

  const fillAdminCredentials = () => {
    setAdminEmail('carol@campus.edu');
    setAdminPassword('admin123');
    setAdminKey('ADMIN2024');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Campus Connect
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student Portal</TabsTrigger>
            <TabsTrigger value="staff">Staff Portal</TabsTrigger>
            <TabsTrigger value="admin">Admin Portal</TabsTrigger>
          </TabsList>

          {/* STUDENT LOGIN */}
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>Student Login</CardTitle>
                    <CardDescription>
                      Access your dashboard to report and track campus issues
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleStudentLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="student-email" 
                        placeholder="your.email@campus.edu" 
                        className="pl-9" 
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="student-password" 
                        type="password" 
                        className="pl-9"
                        placeholder="Enter your password"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Demo Credentials
                      </span>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={fillStudentCredentials}
                  >
                    Use Demo Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* STAFF LOGIN */}
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="h-5 w-5 text-amber-600" />
                  <div>
                    <CardTitle>Staff Login</CardTitle>
                    <CardDescription>
                      Manage assigned issues and update resolutions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleStaffLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="staff-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="staff-email" 
                        placeholder="staff.email@campus.edu" 
                        className="pl-9" 
                        type="email"
                        value={staffEmail}
                        onChange={(e) => setStaffEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staff-id">Staff ID</Label>
                    <div className="relative">
                      <Badge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="staff-id" 
                        placeholder="S12345" 
                        className="pl-9 uppercase"
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Format: S##### (e.g., S12345)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staff-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="staff-password" 
                        type="password" 
                        className="pl-9"
                        placeholder="Enter your password"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Demo Credentials
                      </span>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={fillStaffCredentials}
                  >
                    Use Demo Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ADMIN LOGIN */}
          <TabsContent value="admin">
            <Card className="border-red-300 dark:border-red-800">
              <CardHeader className="bg-red-50 dark:bg-red-950/30 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  <div>
                    <CardTitle>Administrator Login</CardTitle>
                    <CardDescription>
                      Restricted access for system administrators only
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4 pt-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="admin-email" 
                        placeholder="admin@campus.edu" 
                        className="pl-9" 
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Master Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="admin-password" 
                        type="password" 
                        className="pl-9"
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-key">Admin Access Key</Label>
                    <div className="relative">
                      <Badge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="admin-key" 
                        placeholder="Enter admin key" 
                        className="pl-9 font-mono"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Required security key for system access</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Access System"}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Demo Credentials
                      </span>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={fillAdminCredentials}
                  >
                    Use Demo Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
