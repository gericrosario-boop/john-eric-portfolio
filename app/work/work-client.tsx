'use client';

import { useMemo, useState } from 'react';
import { FILTERS } from '@/lib/constants';
import { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';

export function WorkClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const byFilter = filter === 'All' || project.tags.includes(filter) || project.category === filter;
      const bySearch = [project.title, project.description, project.category, ...project.tags]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase());
      return byFilter && bySearch;
    });
  }, [projects, filter, query]);

  return (
    <div className="container-shell space-y-8 py-12">
      <SectionHeading title="Work Gallery" subtitle="Filter by discipline and quickly search across all projects." />
      <div className="space-y-4">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." aria-label="Search projects" />
        <div className="flex flex-wrap gap-2">
          {['All', ...FILTERS].map((item) => (
            <Button key={item} variant={filter === item ? 'default' : 'secondary'} size="sm" onClick={() => setFilter(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}
