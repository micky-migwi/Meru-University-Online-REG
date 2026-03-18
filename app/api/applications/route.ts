import { NextRequest, NextResponse } from 'next/server';
import { createApplication, getApplications } from '@/lib/data';

export async function GET() {
  const applications = await getApplications();
  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const application = await createApplication(payload);
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}
