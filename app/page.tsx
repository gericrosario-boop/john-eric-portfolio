import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/constants';
import { getFeaturedProjects, getProfile } from '@/lib/data';

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getFeaturedProjects()]);

  return (
    <div className="container-shell space-y-20 py-12 sm:py-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Multidisciplinary Creative</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">{profile.hero_title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{profile.hero_subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild><Link href="/work">View Work</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Contact</Link></Button>
        </div>
      </section>

      <section>
        <SectionHeading title="Featured Projects" subtitle="Selected work across ecommerce, motion, UI and brand systems." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Services" />
        <div className="flex flex-wrap gap-3">
          {SERVICES.map((service) => (
            <span key={service} className="rounded-full border px-4 py-2 text-sm">{service}</span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Social" />
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(profile.socials || {}).map(([key, value]) => (
            <a key={key} href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              {key} <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
