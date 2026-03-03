import { Metadata } from 'next';
import { WorkClient } from './work-client';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore graphic design, ecommerce, UI/UX, motion and video work by John Eric.'
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkClient projects={projects} />;
}
