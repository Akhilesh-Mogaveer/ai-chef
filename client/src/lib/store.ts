import { create } from 'zustand';

// Types
export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueCategory = 'maintenance' | 'it' | 'academic' | 'safety' | 'other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: string; // ISO date string
  updatedAt: string;
  userId: string; // Student who reported it
  assignedTo?: string; // Staff ID
  location: string;
}

// Mock Data Store
interface AppState {
  user: User | null;
  issues: Issue[];
  users: User[]; // Mock database of users
  
  // Actions
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'status'>) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  assignIssue: (id: string, staffId: string) => void;
  updateIssuePriority: (id: string, priority: IssuePriority) => void;
  updateUserProfile: (updates: { name?: string; email?: string; avatar?: string }) => void;
}

// Seed Data
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Student', email: 'alice@campus.edu', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: '2', name: 'Bob Staff', email: 'bob@campus.edu', role: 'staff', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: '3', name: 'Carol Admin', email: 'carol@campus.edu', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol' },
  { id: '4', name: 'David Staff', email: 'david@campus.edu', role: 'staff', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];

const MOCK_ISSUES: Issue[] = [
  {
    id: '101',
    title: 'Broken Projector in Room 302',
    description: 'The projector keeps flickering and turning off during lectures.',
    category: 'it',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    userId: '1',
    location: 'Science Building, Room 302',
  },
  {
    id: '102',
    title: 'Leaking Faucet in 2nd Floor Restroom',
    description: 'The sink closest to the door is dripping constantly.',
    category: 'maintenance',
    priority: 'low',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    userId: '1',
    assignedTo: '2',
    location: 'Library, 2nd Floor',
  },
  {
    id: '103',
    title: 'Wifi Dead Zone in Cafeteria',
    description: 'Cannot connect to EduRoam in the north corner of the cafeteria.',
    category: 'it',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    userId: '1',
    location: 'Central Cafeteria',
  },
  {
    id: '104',
    title: 'Loose Handrail on Main Staircase',
    description: 'The handrail feels wobbly and unsafe.',
    category: 'safety',
    priority: 'high',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    userId: '1',
    assignedTo: '4',
    location: 'Admin Building',
  }
];

export const useStore = create<AppState>((set) => ({
  user: null,
  issues: MOCK_ISSUES,
  users: MOCK_USERS,

  login: (email, role) => {
    // Simple mock login
    const user = MOCK_USERS.find(u => u.role === role) || {
      id: '999',
      name: 'Guest User',
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    set({ user });
  },

  logout: () => set({ user: null }),

  addIssue: (issueData) => set((state) => ({
    issues: [
      {
        ...issueData,
        id: Math.random().toString(36).substring(7),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: state.user?.id || 'anonymous',
      },
      ...state.issues,
    ]
  })),

  updateIssueStatus: (id, status) => set((state) => ({
    issues: state.issues.map(issue => 
      issue.id === id 
        ? { ...issue, status, updatedAt: new Date().toISOString() } 
        : issue
    )
  })),

  assignIssue: (id, staffId) => set((state) => ({
    issues: state.issues.map(issue => 
      issue.id === id 
        ? { ...issue, assignedTo: staffId, updatedAt: new Date().toISOString() } 
        : issue
    )
  })),

  updateIssuePriority: (id, priority) => set((state) => ({
    issues: state.issues.map(issue => 
      issue.id === id 
        ? { ...issue, priority, updatedAt: new Date().toISOString() } 
        : issue
    )
  })),

  updateUserProfile: (updates) => set((state) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, ...updates };
    return {
      user: updatedUser,
      users: state.users.map(u => u.id === state.user?.id ? updatedUser : u),
    };
  }),
}));
