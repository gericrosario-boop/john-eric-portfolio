import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'Missing file.' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const name = `${Date.now()}-${file.name}`;
  const supabase = createServiceRoleClient();

  const { error } = await supabase.storage.from('project-assets').upload(name, buffer, {
    contentType: file.type,
    upsert: false
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from('project-assets').getPublicUrl(name);
  return NextResponse.json({ url: data.publicUrl });
}
