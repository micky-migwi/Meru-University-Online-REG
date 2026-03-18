'use client';

import { type ChangeEvent, type FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { courses, gradeOptions, gradeToPoints } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const subjectRows = ['Mathematics', 'English', 'Physics', 'Biology', 'Chemistry'];

export function ApplicationForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('student@smartreg.test');
  const [kcseIndex, setKcseIndex] = useState('');
  const [meanGrade, setMeanGrade] = useState('B');
  const [selectedCourse, setSelectedCourse] = useState(courses[0].name);
  const [notes, setNotes] = useState('');
  const [subjectGrades, setSubjectGrades] = useState<Record<string, string>>({
    Mathematics: 'A-',
    English: 'B',
    Physics: 'B+',
    Biology: 'C+',
    Chemistry: 'C',
  });

  function updateSubject(subject: string, grade: string) {
    setSubjectGrades((current: Record<string, string>) => ({ ...current, [subject]: grade }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const payload = {
        user_id: 'student-1',
        full_name: fullName,
        email,
        kcse_index: kcseIndex,
        mean_grade: meanGrade,
        selected_course: selectedCourse,
        remarks: notes,
        subjects: subjectRows.map((subject) => ({
          name: subject,
          grade: subjectGrades[subject],
          points: gradeToPoints[subjectGrades[subject]],
        })),
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error('Unable to submit application.');
        return;
      }

      const result = await response.json();
      toast.success(`Application submitted. AI recommends ${result.ai_recommended_course}.`);
      setFullName('');
      setKcseIndex('');
      setNotes('');
      router.refresh();
    });
  }

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900">Student application form</h2>
        <p className="text-slate-500">Submit KCSE performance, select a course, and upload supporting records. File upload fields can be wired directly to Supabase Storage.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Full name" value={fullName} onChange={(event: ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)} required />
          <Input placeholder="Email" type="email" value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} required />
          <Input placeholder="KCSE index number" value={kcseIndex} onChange={(event: ChangeEvent<HTMLInputElement>) => setKcseIndex(event.target.value)} required />
          <Select value={meanGrade} onChange={(event: ChangeEvent<HTMLSelectElement>) => setMeanGrade(event.target.value)}>
            {gradeOptions.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
          </Select>
          <div className="md:col-span-2">
            <Select value={selectedCourse} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedCourse(event.target.value)}>
              {courses.map((course) => <option key={course.id} value={course.name}>{course.name}</option>)}
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {subjectRows.map((subject) => (
            <div key={subject} className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-700">{subject}</p>
              <Select value={subjectGrades[subject]} onChange={(event: ChangeEvent<HTMLSelectElement>) => updateSubject(subject, event.target.value)}>
                {gradeOptions.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
              </Select>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {['KCSE Certificate', 'National ID Copy', 'Passport Photo'].map((label) => (
            <label key={label} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
              <span className="mb-2 block font-semibold text-slate-700">{label}</span>
              <input type="file" className="block w-full text-xs" />
            </label>
          ))}
        </div>

        <Textarea placeholder="Extra remarks for admissions review" value={notes} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNotes(event.target.value)} />
        <Button type="submit" size="lg" disabled={pending}>{pending ? 'Submitting…' : 'Submit application'}</Button>
      </form>
    </Card>
  );
}
