export type Role = 'student' | 'admissions' | 'developer';

export type SubjectScore = {
  name: string;
  grade: string;
  points: number;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  min_grade: number;
  required_subjects: string[];
  capacity: number;
  fee: number;
};

export type ApplicationStatus =
  | 'pending'
  | 'auto_approved'
  | 'auto_rejected'
  | 'approved'
  | 'rejected';

export type Application = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  kcse_index: string;
  mean_grade: string;
  mean_points: number;
  subjects: SubjectScore[];
  selected_course: string;
  ai_recommended_course: string;
  ai_reasoning: string;
  status: ApplicationStatus;
  remarks: string;
  created_at: string;
  registration_number?: string;
};

export type Profile = {
  id: string;
  email: string;
  role: Role;
  created_at: string;
};

export type DashboardMetrics = {
  totalUsers: number;
  totalApplications: number;
  approved: number;
  rejected: number;
  pending: number;
  uptime: string;
  traffic: { date: string; visitors: number }[];
  recentActivity: { id: string; action: string; actor: string; time: string }[];
};
