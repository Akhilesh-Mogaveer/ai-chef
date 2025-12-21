import { useState } from 'react';
import { useLocation } from 'wouter';
import { useStore, UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useStore();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      login(email || `${role}@campus.edu`, role);
      setIsLoading(false);
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${role}`,
      });

      if (role === 'student') setLocation('/dashboard/student');
      else if (role === 'staff') setLocation('/dashboard/staff');
      else if (role === 'admin') setLocation('/dashboard/admin');
    }, 1000);
  };

  const fillCredentials = (role: UserRole) => {
    if (role === 'student') {
      setEmail('alice@campus.edu');
      setPassword('student123');
    } else if (role === 'staff') {
      setEmail('bob@campus.edu');
      setPassword('staff123');
    } else if (role === 'admin') {
      setEmail('carol@campus.edu');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Sign in to Campus Connect
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select your role to access the dashboard
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {['student', 'staff', 'admin'].map((role) => (
            <TabsContent key={role} value={role}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{role} Login</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your {role} account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleLogin(e, role as UserRole)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-email`}>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id={`${role}-email`} 
                          placeholder="name@campus.edu" 
                          className="pl-9" 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${role}-password`}>Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id={`${role}-password`} 
                          type="password" 
                          className="pl-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Test Credentials
                        </span>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => fillCredentials(role as UserRole)}
                    >
                      Fill as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
