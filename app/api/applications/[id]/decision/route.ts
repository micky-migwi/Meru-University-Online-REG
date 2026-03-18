import { NextRequest, NextResponse } from 'next/server';
import { decideApplication } from '@/lib/data';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { decision: 'approved' | 'rejected'; remarks: string };
    const application = await decideApplication(id, body.decision, body.remarks);
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}
