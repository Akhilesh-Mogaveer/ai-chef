import { Issue } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { StatusBadge, PriorityBadge, CategoryBadge } from './StatusBadge';
import { Calendar, MapPin, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showReporter?: boolean;
}

export function IssueCard({ issue, onClick, showReporter = false }: IssueCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md border-l-4 border-l-transparent hover:border-l-primary"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
            <CardTitle className="text-lg line-clamp-1">{issue.title}</CardTitle>
          </div>
          <CategoryBadge category={issue.category} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {issue.description}
        </p>
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(issue.createdAt), 'MMM d, yyyy h:mm a')}</span>
          </div>
          {showReporter && (
            <div className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              <span>User ID: {issue.userId}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
