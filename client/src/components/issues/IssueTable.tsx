import { Issue, useStore, IssueStatus, IssuePriority } from '@/lib/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { StatusBadge, PriorityBadge, CategoryBadge } from './StatusBadge';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

interface IssueTableProps {
  issues: Issue[];
  currentUserRole: 'student' | 'staff' | 'admin';
}

export function IssueTable({ issues, currentUserRole }: IssueTableProps) {
  const { updateIssueStatus, assignIssue, updateIssuePriority, users, user: currentUser } = useStore();
  const staffMembers = users.filter(u => u.role === 'staff');

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Issue</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.length === 0 ? (
             <TableRow>
               <TableCell colSpan={7} className="h-24 text-center">
                 No issues found.
               </TableCell>
             </TableRow>
          ) : (
            issues.map((issue) => {
              const assignedUser = users.find(u => u.id === issue.assignedTo);
              
              return (
                <TableRow key={issue.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium line-clamp-1">{issue.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">{issue.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CategoryBadge category={issue.category} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={issue.priority} />
                  </TableCell>
                  <TableCell>
                    {assignedUser ? (
                      <div className="flex items-center gap-2">
                         <img src={assignedUser.avatar} className="h-5 w-5 rounded-full" alt="" />
                         <span className="text-sm">{assignedUser.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {format(new Date(issue.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => alert(`View details for ${issue.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        
                        {(currentUserRole === 'staff' || currentUserRole === 'admin') && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup 
                                  value={issue.status} 
                                  onValueChange={(v) => updateIssueStatus(issue.id, v as IssueStatus)}
                                >
                                  <DropdownMenuRadioItem value="open">Open</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="in-progress">In Progress</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="resolved">Resolved</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </>
                        )}
                        
                        {currentUserRole === 'admin' && (
                          <>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Assign To</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup 
                                  value={issue.assignedTo || ''}
                                  onValueChange={(v) => assignIssue(issue.id, v)}
                                >
                                  <DropdownMenuRadioItem value="">Unassigned</DropdownMenuRadioItem>
                                  {staffMembers.map(staff => (
                                    <DropdownMenuRadioItem key={staff.id} value={staff.id}>
                                      {staff.name}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup 
                                  value={issue.priority}
                                  onValueChange={(v) => updateIssuePriority(issue.id, v as IssuePriority)}
                                >
                                  <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
