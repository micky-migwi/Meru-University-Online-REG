import { NextResponse } from 'next/server';
import { demoApplications, demoProfiles } from '@/lib/mock-data';
import { writeStore } from '@/lib/storage';

export async function POST() {
  await writeStore({ profiles: demoProfiles, applications: demoApplications });
  return NextResponse.json({ ok: true });
}
