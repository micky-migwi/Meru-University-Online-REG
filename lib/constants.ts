import { Course } from '@/lib/types';

export const gradeToPoints: Record<string, number> = {
  A: 12,
  'A-': 11,
  'B+': 10,
  B: 9,
  'B-': 8,
  'C+': 7,
  C: 6,
  'C-': 5,
  'D+': 4,
  D: 3,
  'D-': 2,
  E: 1,
};

export const courses: Course[] = [
  {
    id: 'course-cs',
    name: 'BSc Computer Science',
    code: 'CS',
    min_grade: 8,
    required_subjects: ['Mathematics', 'Physics'],
    capacity: 120,
    fee: 86500,
  },
  {
    id: 'course-it',
    name: 'BSc Information Technology',
    code: 'IT',
    min_grade: 7,
    required_subjects: ['Mathematics'],
    capacity: 150,
    fee: 79500,
  },
  {
    id: 'course-nursing',
    name: 'BSc Nursing',
    code: 'NUR',
    min_grade: 9,
    required_subjects: ['Biology', 'Chemistry'],
    capacity: 80,
    fee: 98500,
  },
  {
    id: 'course-business',
    name: 'Bachelor of Commerce',
    code: 'BCOM',
    min_grade: 6,
    required_subjects: ['Mathematics'],
    capacity: 200,
    fee: 70250,
  },
];

export const gradeOptions = Object.keys(gradeToPoints);
