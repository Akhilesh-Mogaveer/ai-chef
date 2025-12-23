import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore, IssueCategory, IssuePriority } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { categorizeIssue } from '@/lib/aiCategorizer';
import { Badge } from '@/components/ui/badge';
import { AIAnalysisCard } from './AIAnalysisCard';
import { Lightbulb, Send } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(3, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export function ReportIssueForm() {
  const { addIssue } = useStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorization, setCategorization] = useState<{ category: IssueCategory; priority: IssuePriority } | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    setTimeout(() => {
      const categorization = categorizeIssue(values.title, values.location, values.description);
      
      addIssue({
        title: values.title,
        description: values.description,
        location: values.location,
        category: categorization.category,
        priority: categorization.priority,
      });
      
      toast({
        title: "Issue Submitted Successfully",
        description: `Your report has been categorized as ${categorization.category} with ${categorization.priority} priority.`,
      });
      
      setIsSubmitting(false);
      setCategorization(null);
      form.reset();
    }, 800);
  }

  const watchTitle = form.watch('title');
  const watchLocation = form.watch('location');
  const watchDescription = form.watch('description');

  const handleAnalyze = () => {
    if (watchTitle && watchLocation && watchDescription) {
      const result = categorizeIssue(watchTitle, watchLocation, watchDescription);
      setCategorization(result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a New Issue</CardTitle>
        <CardDescription>
          Describe the problem you're experiencing. Our AI will help categorize and prioritize it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Leaky faucet in library restroom" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Building A, 2nd floor, room 203" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide more details about the issue." 
                      className="resize-none h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {categorization && (
              <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-3 w-full">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        AI Analysis
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-blue-800 dark:text-blue-200">Category:</span>
                          <Badge className="capitalize">{categorization.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-blue-800 dark:text-blue-200">Priority:</span>
                          <Badge 
                            variant="outline" 
                            className={
                              categorization.priority === 'high' ? 'border-red-500 text-red-700 dark:text-red-400' :
                              categorization.priority === 'medium' ? 'border-amber-500 text-amber-700 dark:text-amber-400' :
                              'border-green-500 text-green-700 dark:text-green-400'
                            }
                          >
                            {categorization.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!categorization && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAnalyze}
                  disabled={!watchTitle || !watchLocation || !watchDescription}
                >
                  Analyze with AI
                </Button>
              )}
              {categorization && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setCategorization(null)}
                >
                  Re-analyze
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={isSubmitting || !categorization}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Issue"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
