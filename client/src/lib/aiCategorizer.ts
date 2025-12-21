import { IssueCategory, IssuePriority } from './store';

const categoryKeywords: Record<IssueCategory, string[]> = {
  maintenance: ['leak', 'broken', 'fix', 'repair', 'wall', 'ceiling', 'floor', 'door', 'window', 'ac', 'heating', 'plumbing', 'electrical', 'paint', 'damage'],
  it: ['wifi', 'internet', 'computer', 'printer', 'network', 'server', 'it', 'tech', 'system', 'software', 'email', 'password'],
  academic: ['classroom', 'lab', 'equipment', 'resource', 'library', 'course', 'learning', 'educational'],
  safety: ['unsafe', 'hazard', 'dangerous', 'security', 'lock', 'lighting', 'dark', 'emergency', 'injury', 'risk'],
  other: [],
};

const priorityKeywords: Record<IssuePriority, string[]> = {
  high: ['urgent', 'emergency', 'critical', 'dangerous', 'unsafe', 'broken', 'severe', 'leaking', 'flooding', 'fire', 'injury', 'risk'],
  medium: ['soon', 'issue', 'problem', 'concern', 'needs', 'repair'],
  low: ['minor', 'small', 'cosmetic', 'aesthetics', 'nice to have'],
};

export function categorizeIssue(title: string, location: string, description: string): { category: IssueCategory; priority: IssuePriority } {
  const text = `${title} ${location} ${description}`.toLowerCase();
  
  // Calculate category scores
  const categoryScores: Record<IssueCategory, number> = {
    maintenance: 0,
    it: 0,
    academic: 0,
    safety: 0,
    other: 0,
  };

  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        categoryScores[category as IssueCategory]++;
      }
    });
  });

  // Get highest scoring category
  let selectedCategory: IssueCategory = 'other';
  let maxScore = 0;
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      selectedCategory = category as IssueCategory;
    }
  });

  // Calculate priority scores
  const priorityScores: Record<IssuePriority, number> = {
    high: 0,
    medium: 0,
    low: 0,
  };

  Object.entries(priorityKeywords).forEach(([priority, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        priorityScores[priority as IssuePriority]++;
      }
    });
  });

  // Get priority with highest score, default to medium
  let selectedPriority: IssuePriority = 'medium';
  let maxPriorityScore = 0;
  Object.entries(priorityScores).forEach(([priority, score]) => {
    if (score > maxPriorityScore) {
      maxPriorityScore = score;
      selectedPriority = priority as IssuePriority;
    }
  });

  // If no keywords matched, default based on text length/complexity
  if (maxScore === 0) {
    if (text.includes('it') || text.includes('wifi') || text.includes('network')) {
      selectedCategory = 'it';
    } else if (text.includes('safe') || text.includes('danger') || text.includes('unsafe')) {
      selectedCategory = 'safety';
    } else {
      selectedCategory = 'maintenance';
    }
  }

  return { category: selectedCategory, priority: selectedPriority };
}
