import { Badge } from '@/components/ui/badge';
import { IssueStatus, IssuePriority, IssueCategory } from '@/lib/store';

export function StatusBadge({ status }: { status: IssueStatus }) {
  const variants = {
    open: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
    "in-progress": "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200",
    resolved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  };

  const labels = {
    open: "Open",
    "in-progress": "In Progress",
    resolved: "Resolved",
  };

  return (
    <Badge variant="outline" className={`${variants[status]} capitalize shadow-none`}>
      {labels[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: IssuePriority }) {
  const variants = {
    low: "text-slate-600 border-slate-200",
    medium: "text-orange-600 border-orange-200",
    high: "text-red-600 border-red-200 bg-red-50",
  };

  return (
    <Badge variant="outline" className={`${variants[priority]} capitalize shadow-none`}>
      {priority}
    </Badge>
  );
}

export function CategoryBadge({ category }: { category: IssueCategory }) {
  return (
    <Badge variant="secondary" className="capitalize shadow-none">
      {category}
    </Badge>
  );
}
