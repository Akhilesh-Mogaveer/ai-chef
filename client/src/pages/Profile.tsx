import { useState } from 'react';
import { useLocation } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload } from 'lucide-react';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, updateUserProfile } = useStore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  if (!user) {
    setLocation('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setFormData(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      if (!formData.name.trim()) {
        toast({
          title: "Error",
          description: "Name cannot be empty",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      if (!formData.email.trim()) {
        toast({
          title: "Error",
          description: "Email cannot be empty",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      updateUserProfile({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });

      setIsSaving(false);
    }, 600);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account information</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your name, email, and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Picture Preview */}
              <div className="flex flex-col items-center gap-4">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
                />
                <div className="text-center text-sm text-muted-foreground">
                  <span className="capitalize font-medium">{user.role}</span>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Avatar URL Field */}
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={handleAvatarChange}
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL to an image file to use as your profile picture. You can use any image URL or generate one from services like DiceBear.
                </p>
              </div>

              {/* Quick Avatar Options */}
              <div className="space-y-2">
                <Label>Quick Avatar Options</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry'].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
                      }))}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                        alt={name}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className="text-xs">{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="gap-2"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setFormData({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar || '',
                  })}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card className="bg-slate-50 dark:bg-slate-900/30">
          <CardHeader>
            <CardTitle className="text-base">Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID:</span>
              <span className="font-mono text-xs">{user.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
