'use client';

import { useMemo, useState } from 'react';
import { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';

const empty: Partial<Project> = {
  title: '',
  slug: '',
  category: 'Graphic Design',
  tags: [],
  year: new Date().getFullYear(),
  role: '',
  tools: [],
  description: '',
  content: '',
  featured: false,
  cover_type: 'image',
  cover_url: '',
  cover_thumb_url: ''
};

export function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id ?? null);
  const [form, setForm] = useState<Partial<Project>>(projects[0] ?? empty);
  const [status, setStatus] = useState('');

  const current = useMemo(() => projects.find((project) => project.id === selectedId), [projects, selectedId]);

  const update = (field: keyof Project, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const save = async () => {
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title || ''),
      tags: typeof form.tags === 'string' ? (form.tags as string).split(',').map((item) => item.trim()) : form.tags,
      tools: typeof form.tools === 'string' ? (form.tools as string).split(',').map((item) => item.trim()) : form.tools
    };

    const res = await fetch('/api/admin/projects', {
      method: current ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current ? { ...payload, id: current.id } : payload)
    });

    setStatus(res.ok ? 'Saved successfully.' : 'Save failed.');
  };

  const remove = async () => {
    if (!current) return;
    const res = await fetch(`/api/admin/projects?id=${current.id}`, { method: 'DELETE' });
    setStatus(res.ok ? 'Deleted.' : 'Delete failed.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
      <aside className="space-y-2">
        <Button variant="outline" className="w-full" onClick={() => { setSelectedId(null); setForm(empty); }}>+ New Project</Button>
        {projects.map((project) => (
          <button key={project.id} className="w-full rounded-xl border px-3 py-2 text-left text-sm" onClick={() => { setSelectedId(project.id); setForm(project); }}>
            {project.title}
          </button>
        ))}
      </aside>
      <section className="space-y-3 rounded-2xl border p-4">
        <Input placeholder="Title" value={form.title ?? ''} onChange={(e) => { update('title', e.target.value); update('slug', slugify(e.target.value)); }} />
        <Input placeholder="Slug" value={form.slug ?? ''} onChange={(e) => update('slug', e.target.value)} />
        <Input placeholder="Category" value={form.category ?? ''} onChange={(e) => update('category', e.target.value)} />
        <Input placeholder="Year" type="number" value={form.year ?? new Date().getFullYear()} onChange={(e) => update('year', Number(e.target.value))} />
        <Input placeholder="Role" value={form.role ?? ''} onChange={(e) => update('role', e.target.value)} />
        <Input placeholder="Tools (comma separated)" value={Array.isArray(form.tools) ? form.tools.join(', ') : (form.tools as string) ?? ''} onChange={(e) => update('tools', e.target.value)} />
        <Input placeholder="Tags (comma separated)" value={Array.isArray(form.tags) ? form.tags.join(', ') : (form.tags as string) ?? ''} onChange={(e) => update('tags', e.target.value)} />
        <Input placeholder="Cover type (image/video)" value={form.cover_type ?? 'image'} onChange={(e) => update('cover_type', e.target.value)} />
        <Input placeholder="Cover URL" value={form.cover_url ?? ''} onChange={(e) => update('cover_url', e.target.value)} />
        <Input placeholder="Cover thumbnail URL" value={form.cover_thumb_url ?? ''} onChange={(e) => update('cover_thumb_url', e.target.value)} />
        <Textarea placeholder="Short description" value={form.description ?? ''} onChange={(e) => update('description', e.target.value)} />
        <Textarea placeholder="Case study content" value={form.content ?? ''} onChange={(e) => update('content', e.target.value)} className="min-h-[180px]" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => update('featured', e.target.checked)} /> Featured</label>
        <div className="flex gap-2">
          <Button onClick={save}>Save Project</Button>
          {current ? <Button variant="outline" onClick={remove}>Delete</Button> : null}
        </div>
        {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
      </section>
    </div>
  );
}
