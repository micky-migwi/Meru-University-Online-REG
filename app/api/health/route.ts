import { NextResponse } from 'next/server';
import { env, hasSupabaseEnv } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    checks: {
      supabaseConfigured: hasSupabaseEnv,
      openAIConfigured: Boolean(env.OPENAI_API_KEY),
      emailConfigured: Boolean(env.RESEND_API_KEY && env.EMAIL_FROM),
    },
    timestamp: new Date().toISOString(),
  });
}
