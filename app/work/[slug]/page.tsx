import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectBySlug, getProjects } from '@/lib/data';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getProjectBySlug(params.slug);
  if (!data) return {};
  return {
    title: data.project.title,
    description: data.project.description,
    openGraph: {
      title: data.project.title,
      description: data.project.description
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const data = await getProjectBySlug(params.slug);
  if (!data) notFound();

  const { project, media, nextProject } = data;
  return (
    <div className="container-shell space-y-10 py-12">
      <section className="space-y-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge>{project.role}</Badge>
          <Badge>{project.year}</Badge>
          {project.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}
        </div>
        <p className="max-w-2xl text-muted-foreground">{project.description}</p>
        <article className="max-w-3xl leading-7 text-muted-foreground">{project.content}</article>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {media.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-2xl border bg-muted">
            {item.type === 'image' ? (
              <Image src={item.url} alt={project.title} width={1200} height={800} className="h-auto w-full" />
            ) : (
              <video src={item.url} controls className="w-full" preload="metadata" poster={item.thumb_url ?? undefined} />
            )}
          </div>
        ))}
      </section>

      <div>
        <Button asChild variant="outline">
          <Link href={`/work/${nextProject.slug}`}>Next project: {nextProject.title}</Link>
        </Button>
      </div>
    </div>
  );
}
