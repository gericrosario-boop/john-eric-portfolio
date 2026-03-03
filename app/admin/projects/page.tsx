import { getProjects } from '@/lib/data';
import { ProjectsAdminClient } from './projects-admin-client';

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return <ProjectsAdminClient projects={projects} />;
}
