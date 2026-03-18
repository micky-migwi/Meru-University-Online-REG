import { Resend } from 'resend';
import { env } from '@/lib/env';
import { Application, Course } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

function logEmail(subject: string, to: string, html: string) {
  console.info('[email:fallback]', { subject, to, html });
}

export async function sendApplicationReceivedEmail(application: Application) {
  const subject = 'SmartReg Application Received';
  const html = `<p>Hello ${application.full_name},</p><p>Your application for ${application.selected_course} has been received. Track your progress from the student dashboard.</p>`;

  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    logEmail(subject, application.email, html);
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: application.email,
    subject,
    html,
  });
}

export async function sendFinalApprovalEmail(application: Application, course: Course) {
  const subject = 'SmartReg Final Admission Approval';
  const html = `
    <p>Hello ${application.full_name},</p>
    <p>Congratulations! Your admission has been approved.</p>
    <ul>
      <li>Registration Number: <strong>${application.registration_number}</strong></li>
      <li>Course: <strong>${course.name}</strong></li>
      <li>Fees: <strong>${formatCurrency(course.fee)}</strong></li>
    </ul>
    <p>Please bring your bank slip to the school for portal activation.</p>
  `;

  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    logEmail(subject, application.email, html);
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: application.email,
    subject,
    html,
  });
}
