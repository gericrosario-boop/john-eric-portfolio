import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient, hasSupabaseEnv } from '@/lib/supabase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from('contact_submissions').insert(parsed.data);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
