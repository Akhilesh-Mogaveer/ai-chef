import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeIssueWithAI, AIAnalysis } from '@/lib/aiAnalyzer';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIAnalysisCardProps {
  title: string;
  description: string;
  location: string;
}

const priorityColors = {
  low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
};

const severityColors = {
  Critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  High: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  Medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  Low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

export function AIAnalysisCard({ title, description, location }: AIAnalysisCardProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function performAnalysis() {
      try {
        setLoading(true);
        setError(null);
        const result = await analyzeIssueWithAI(title, description, location);
        setAnalysis(result);
      } catch (err) {
        setError('Failed to analyze issue with AI');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    performAnalysis();
  }, [title, description, location]);

  if (loading) {
    return (
      <Card className="border-blue-200 dark:border-blue-900/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            AI Analysis
          </CardTitle>
          <CardDescription>Powered by Google Gemini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-sm text-muted-foreground">Analyzing issue...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !analysis) {
    return (
      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600 dark:text-red-400">{error || 'Unable to analyze issue'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          AI Analysis
        </CardTitle>
        <CardDescription>Powered by Google Gemini</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Summary</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{analysis.summary}</p>
        </div>

        {/* Category and Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Category</p>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 capitalize">
              {analysis.category}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Priority</p>
            <Badge className={priorityColors[analysis.priority]} variant="secondary">
              {analysis.priority}
            </Badge>
          </div>
        </div>

        {/* Severity */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Severity</p>
          <Badge 
            className={severityColors[analysis.severity as keyof typeof severityColors] || severityColors.Medium}
            variant="secondary"
          >
            {analysis.severity}
          </Badge>
        </div>

        {/* Recommendations */}
        {analysis.recommendations.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Recommended Actions</p>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-300">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
