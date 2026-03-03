import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://john-eric-portfolio.vercel.app';
  const projects = await getProjects();

  return [
    '',
    '/work',
    '/about',
    '/contact',
    '/now',
    ...projects.map((project) => `/work/${project.slug}`)
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
