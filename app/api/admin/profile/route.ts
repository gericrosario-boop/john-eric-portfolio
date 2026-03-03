import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase';

export async function PUT(request: Request) {
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase.from('profiles').select('id').limit(1).single();

  if (existing?.id) {
    const { data, error } = await supabase.from('profiles').update(body).eq('id', existing.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data, error } = await supabase.from('profiles').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
