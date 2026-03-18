import { courses } from '@/lib/constants';
import { recommendCourse } from '@/lib/ai';
import { sendApplicationReceivedEmail, sendFinalApprovalEmail } from '@/lib/email';
import { readStore, writeStore } from '@/lib/storage';
import { Application, DashboardMetrics } from '@/lib/types';
import { computeMeanPoints, evaluateApplication, generateRegistrationNumber } from '@/lib/utils';
import { demoMetrics } from '@/lib/mock-data';

export async function getApplications() {
  const store = await readStore();
  return store.applications.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getApplicationsByUser(userId: string) {
  const apps = await getApplications();
  return apps.filter((application) => application.user_id === userId);
}

export async function createApplication(input: Omit<Application, 'id' | 'mean_points' | 'status' | 'ai_recommended_course' | 'ai_reasoning' | 'created_at'>) {
  const store = await readStore();
  const selectedCourse = courses.find((course) => course.name === input.selected_course);

  if (!selectedCourse) {
    throw new Error('Selected course does not exist');
  }

  const meanPoints = computeMeanPoints(input.mean_grade);
  const recommendation = await recommendCourse(input.subjects, input.mean_grade);
  const status = evaluateApplication(selectedCourse, meanPoints, input.subjects);

  const application: Application = {
    ...input,
    id: crypto.randomUUID(),
    mean_points: meanPoints,
    ai_recommended_course: recommendation.course,
    ai_reasoning: recommendation.reason,
    status,
    created_at: new Date().toISOString(),
  };

  store.applications.unshift(application);
  await writeStore(store);
  await sendApplicationReceivedEmail(application);
  return application;
}

export async function decideApplication(id: string, decision: 'approved' | 'rejected', remarks: string) {
  const store = await readStore();
  const applicationIndex = store.applications.findIndex((application) => application.id === id);

  if (applicationIndex === -1) {
    throw new Error('Application not found');
  }

  const application = store.applications[applicationIndex];
  const course = courses.find((item) => item.name === application.selected_course);

  if (!course) {
    throw new Error('Course not found');
  }

  const approvedCount = store.applications.filter((item) => item.registration_number?.includes(`/${course.code}/`)).length;
  const updated: Application = {
    ...application,
    status: decision,
    remarks,
    registration_number:
      decision === 'approved'
        ? application.registration_number ?? generateRegistrationNumber(course, approvedCount)
        : undefined,
  };

  store.applications[applicationIndex] = updated;
  await writeStore(store);

  if (decision === 'approved') {
    await sendFinalApprovalEmail(updated, course);
  }

  return updated;
}

export async function getMetrics(): Promise<DashboardMetrics> {
  const store = await readStore();
  const approved = store.applications.filter((application) => ['approved', 'auto_approved'].includes(application.status)).length;
  const rejected = store.applications.filter((application) => ['rejected', 'auto_rejected'].includes(application.status)).length;
  const pending = store.applications.filter((application) => application.status === 'pending').length;

  return {
    ...demoMetrics,
    totalUsers: store.profiles.length,
    totalApplications: store.applications.length,
    approved,
    rejected,
    pending,
  };
}
