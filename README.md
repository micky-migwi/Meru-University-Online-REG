# SmartReg – Meru University School Registration System

SmartReg is a deployment-ready Next.js App Router starter for Meru University admissions. It includes student application workflows, admissions review tools, developer analytics, AI-assisted course recommendations, auto-decisioning, email integration hooks, and Supabase-ready data models.

## Features

- **Student portal** with registration/login entry points, application submission, document placeholders, progress tracking, and application history.
- **Admissions dashboard** for filtering pending/auto-decided applications, adding remarks, and issuing final approval or rejection decisions.
- **Developer analytics dashboard** with KPI cards, traffic charts, recent activity logs, and health probes.
- **AI course recommendation engine** with OpenAI support and deterministic fallback recommendations when no API key is configured.
- **Email integration hooks** using Resend with safe logging fallback in local development.
- **Supabase-ready architecture** including auth environment variables, server/client client factories, middleware route protection, and SQL schema.
- **Deployment-ready UX** using Tailwind CSS, loading-friendly card layouts, responsive design, and toast notifications.

## Tech stack

- Next.js 15 App Router
- React 19
- Tailwind CSS
- Supabase SSR helpers and Supabase JS
- OpenAI Responses API
- Resend email API
- Recharts for analytics visualizations
- Sonner for toast notifications

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` and use the demo login page to access each role dashboard.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side privileged Supabase access |
| `OPENAI_API_KEY` | OpenAI API key for AI course recommendations |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `EMAIL_FROM` | Sender email address for outgoing admissions email |

## Supabase setup

1. Create a new Supabase project.
2. Run the SQL in [`sql/supabase-schema.sql`](sql/supabase-schema.sql).
3. Enable Email + Password authentication in Supabase Auth.
4. Create a public storage bucket for student documents, for example `student-documents`.
5. Replace the demo cookie-based login flow in `app/api/auth/demo-login/route.ts` with Supabase Auth calls when production credentials are available.

## Key workflows

### Student submission

- Student enters KCSE details, subjects, and the selected course.
- API route stores the application and evaluates automatic status.
- AI recommendation is generated and persisted.
- Confirmation email hook is executed.

### Admissions approval

- Admissions officers review pending and auto-decided applications.
- Approving an application generates a registration number in the format `MUST/<year>/<course-code>/<serial>`.
- Final approval email includes the registration number, course, fee information, and onboarding instructions.

### Developer analytics

- System health is available at `/api/health`.
- Dashboard metrics combine stored admissions records with mock traffic/activity insight data to provide an admin operations view.

## Notes for production hardening

- Swap the local JSON fallback store in `lib/storage.ts` with actual Supabase reads/writes.
- Replace demo cookie sessions with Supabase Auth sessions and enrich `profiles` row creation on signup.
- Wire file upload components to Supabase Storage signed upload URLs.
- Connect Supabase Realtime subscriptions to refresh application status changes instantly.
- Add CSV export or audit tables if deeper reporting is required.
