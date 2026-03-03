'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminMediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const upload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/media', { method: 'POST', body: form });
    const json = await res.json();
    setStatus(res.ok ? `Uploaded: ${json.url}` : json.error || 'Upload failed');
  };

  return (
    <div className="max-w-lg space-y-4 rounded-2xl border p-5">
      <h1 className="text-lg font-semibold">Media Upload</h1>
      <Input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Button onClick={upload}>Upload to Supabase Storage</Button>
      <p className="text-sm text-muted-foreground">{status}</p>
      <p className="text-xs text-muted-foreground">For video thumbnails, upload an image and save it as cover_thumb_url in projects.</p>
    </div>
  );
}
