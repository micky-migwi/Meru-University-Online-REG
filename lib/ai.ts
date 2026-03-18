import OpenAI from 'openai';
import { courses } from '@/lib/constants';
import { env } from '@/lib/env';
import { SubjectScore } from '@/lib/types';

function heuristicRecommendation(subjects: SubjectScore[], meanPoints: number) {
  const hasStrongMath = subjects.some((subject) => subject.name === 'Mathematics' && subject.points >= 9);
  const hasStrongPhysics = subjects.some((subject) => subject.name === 'Physics' && subject.points >= 8);
  const hasStrongBiology = subjects.some((subject) => subject.name === 'Biology' && subject.points >= 9);

  if (hasStrongMath && hasStrongPhysics) {
    return {
      course: 'BSc Computer Science',
      reason: 'Strong Mathematics and Physics scores indicate a good fit for analytical computing programs.',
    };
  }

  if (hasStrongBiology && meanPoints >= 8) {
    return {
      course: 'BSc Nursing',
      reason: 'Excellent Biology performance and a competitive mean grade align with Nursing admission expectations.',
    };
  }

  if (meanPoints >= 7) {
    return {
      course: 'BSc Information Technology',
      reason: 'A solid overall result gives the learner flexibility across practical technology programs.',
    };
  }

  return {
    course: 'Bachelor of Commerce',
    reason: 'The profile suggests a broader entry pathway with progression opportunities in commerce and administration.',
  };
}

export async function recommendCourse(subjects: SubjectScore[], meanGrade: string) {
  const averagePoints = subjects.reduce((sum, subject) => sum + subject.points, 0) / Math.max(subjects.length, 1);
  const fallback = heuristicRecommendation(subjects, averagePoints);

  if (!env.OPENAI_API_KEY) {
    return fallback;
  }

  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'system',
        content: 'You recommend university courses for Kenyan KCSE applicants. Return strict JSON with keys course and reason.',
      },
      {
        role: 'user',
        content: `Mean grade: ${meanGrade}. Subjects: ${subjects.map((subject) => `${subject.name} ${subject.grade}`).join(', ')}. Available courses: ${courses.map((course) => course.name).join(', ')}.`,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'course_recommendation',
        schema: {
          type: 'object',
          properties: {
            course: { type: 'string' },
            reason: { type: 'string' },
          },
          required: ['course', 'reason'],
          additionalProperties: false,
        },
      },
    },
  });

  return JSON.parse(response.output_text) as { course: string; reason: string };
}
