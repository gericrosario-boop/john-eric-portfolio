import { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { getProfile } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about John Eric and his multidisciplinary creative practice.'
};

const skills = ['Creative Direction', 'Ecommerce Design', 'Motion Systems', 'UI/UX', 'Video Storytelling', 'Sound Design'];
const tools = ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'After Effects', 'Premiere Pro', 'DaVinci Resolve'];

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="container-shell space-y-10 py-12">
      <SectionHeading title="About John Eric" subtitle={profile.bio} />
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Experience</h3>
          <p className="text-muted-foreground">7+ years building ecommerce creatives, motion-first storytelling, and UI systems that bridge brand and product growth.</p>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Skills</h3>
          <ul className="space-y-2 text-muted-foreground">{skills.map((skill) => <li key={skill}>• {skill}</li>)}</ul>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Tool Stack</h3>
        <div className="flex flex-wrap gap-2">{tools.map((tool) => <span key={tool} className="rounded-full border px-3 py-1 text-sm">{tool}</span>)}</div>
      </div>
    </div>
  );
}
