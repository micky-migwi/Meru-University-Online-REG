import { Application, DashboardMetrics, Profile } from '@/lib/types';

export const demoProfiles: Profile[] = [
  { id: 'student-1', email: 'student@smartreg.test', role: 'student', created_at: '2026-01-10T08:00:00.000Z' },
  { id: 'admissions-1', email: 'admissions@smartreg.test', role: 'admissions', created_at: '2026-01-10T08:10:00.000Z' },
  { id: 'developer-1', email: 'developer@smartreg.test', role: 'developer', created_at: '2026-01-10T08:20:00.000Z' },
];

export const demoApplications: Application[] = [
  {
    id: 'app-001',
    user_id: 'student-1',
    full_name: 'Joyce Kendi',
    email: 'joyce@example.com',
    kcse_index: '12345678901',
    mean_grade: 'B+',
    mean_points: 10,
    subjects: [
      { name: 'Mathematics', grade: 'A-', points: 11 },
      { name: 'Physics', grade: 'B+', points: 10 },
      { name: 'English', grade: 'B', points: 9 },
    ],
    selected_course: 'BSc Computer Science',
    ai_recommended_course: 'BSc Computer Science',
    ai_reasoning: 'Excellent quantitative performance and strong physics alignment.',
    status: 'auto_approved',
    remarks: 'Awaiting officer confirmation.',
    created_at: '2026-02-01T09:30:00.000Z',
  },
  {
    id: 'app-002',
    user_id: 'student-2',
    full_name: 'Brian Muturi',
    email: 'brian@example.com',
    kcse_index: '22345678901',
    mean_grade: 'C+',
    mean_points: 7,
    subjects: [
      { name: 'Biology', grade: 'B', points: 9 },
      { name: 'Chemistry', grade: 'C+', points: 7 },
      { name: 'Mathematics', grade: 'C', points: 6 },
    ],
    selected_course: 'BSc Nursing',
    ai_recommended_course: 'Bachelor of Commerce',
    ai_reasoning: 'Science strengths are good, but the overall cluster favors business pathways.',
    status: 'pending',
    remarks: 'Needs manual review due to borderline mean grade.',
    created_at: '2026-02-03T13:15:00.000Z',
  },
  {
    id: 'app-003',
    user_id: 'student-3',
    full_name: 'Mercy Mwangi',
    email: 'mercy@example.com',
    kcse_index: '32345678901',
    mean_grade: 'D+',
    mean_points: 4,
    subjects: [
      { name: 'Mathematics', grade: 'D+', points: 4 },
      { name: 'Biology', grade: 'C-', points: 5 },
      { name: 'English', grade: 'C', points: 6 },
    ],
    selected_course: 'BSc Information Technology',
    ai_recommended_course: 'Certificate in ICT (future program)',
    ai_reasoning: 'The current undergraduate options require stronger mean grade performance.',
    status: 'auto_rejected',
    remarks: 'Below threshold.',
    created_at: '2026-02-08T15:45:00.000Z',
  },
];

export const demoMetrics: DashboardMetrics = {
  totalUsers: 386,
  totalApplications: 241,
  approved: 124,
  rejected: 37,
  pending: 80,
  uptime: '99.98%',
  traffic: [
    { date: 'Mon', visitors: 84 },
    { date: 'Tue', visitors: 112 },
    { date: 'Wed', visitors: 132 },
    { date: 'Thu', visitors: 154 },
    { date: 'Fri', visitors: 121 },
    { date: 'Sat', visitors: 63 },
    { date: 'Sun', visitors: 51 },
  ],
  recentActivity: [
    { id: 'act-1', action: 'Application auto-approved', actor: 'Rules Engine', time: '10 mins ago' },
    { id: 'act-2', action: 'Approval email sent', actor: 'Admissions Bot', time: '42 mins ago' },
    { id: 'act-3', action: 'New student signup', actor: 'Student Portal', time: '1 hour ago' },
  ],
};
