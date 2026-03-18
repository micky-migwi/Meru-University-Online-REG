import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { gradeToPoints } from '@/lib/constants';
import { Application, Course, SubjectScore } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function computeMeanPoints(meanGrade: string) {
  return gradeToPoints[meanGrade] ?? 0;
}

export function subjectPoints(subjects: SubjectScore[]) {
  return Object.fromEntries(subjects.map((subject) => [subject.name, subject.points]));
}

export function evaluateApplication(course: Course, meanPoints: number, subjects: SubjectScore[]) {
  const scores = subjectPoints(subjects);
  const meetsGrade = meanPoints >= course.min_grade;
  const meetsSubjects = course.required_subjects.every((subject) => (scores[subject] ?? 0) >= 7);

  if (meetsGrade && meetsSubjects) {
    return 'auto_approved' as const;
  }

  if (meanPoints + 1 >= course.min_grade) {
    return 'pending' as const;
  }

  return 'auto_rejected' as const;
}

export function generateRegistrationNumber(course: Course, existingCount: number) {
  const year = new Date().getFullYear();
  const serial = String(existingCount + 1).padStart(5, '0');
  return `MUST/${year}/${course.code}/${serial}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStatusTone(status: Application['status']) {
  switch (status) {
    case 'approved':
    case 'auto_approved':
      return 'bg-emerald-100 text-emerald-700';
    case 'rejected':
    case 'auto_rejected':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-amber-100 text-amber-700';
  }
}
