'use client';

import { useState } from 'react';
import { Profile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ProfileAdminClient({ profile }: { profile: Profile }) {
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState('');

  const updateSocial = (key: string, value: string) => setForm((prev) => ({ ...prev, socials: { ...prev.socials, [key]: value } }));

  const save = async () => {
    const res = await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setStatus(res.ok ? 'Profile updated.' : 'Update failed.');
  };

  return (
    <div className="max-w-2xl space-y-3 rounded-2xl border p-5">
      <Input value={form.hero_title} onChange={(e) => setForm((prev) => ({ ...prev, hero_title: e.target.value }))} placeholder="Hero title" />
      <Textarea value={form.hero_subtitle} onChange={(e) => setForm((prev) => ({ ...prev, hero_subtitle: e.target.value }))} placeholder="Hero subtitle" />
      <Textarea value={form.bio} onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))} placeholder="Bio" />
      <Input value={form.profile_image_url ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, profile_image_url: e.target.value }))} placeholder="Profile image URL" />
      {['instagram', 'behance', 'dribbble', 'tiktok', 'youtube', 'linkedin'].map((social) => (
        <Input key={social} value={form.socials?.[social as keyof typeof form.socials] ?? ''} onChange={(e) => updateSocial(social, e.target.value)} placeholder={`${social} url`} />
      ))}
      <Button onClick={save}>Save Profile</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
