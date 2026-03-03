import { FILTERS } from './constants';
import { hasSupabaseEnv, createServerSupabaseClient } from './supabase';
import { Profile, Project, ProjectMedia } from './types';

const fallbackProfile: Profile = {
  id: 'fallback',
  hero_title: 'John Eric — Designer & Editor',
  hero_subtitle:
    'Building ecommerce creatives, product design systems, motion UI and content that converts.',
  bio: 'John Eric is a multidisciplinary creative with 7+ years across ecommerce visuals, UI/UX systems, motion graphics, and video storytelling.',
  profile_image_url: null,
  socials: {
    instagram: 'https://instagram.com',
    behance: 'https://behance.net',
    dribbble: 'https://dribbble.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  },
  updated_at: new Date().toISOString()
};

const cover = (id: number) => `https://images.unsplash.com/photo-152${id}0903-3c9f4f9?auto=format&fit=crop&w=1400&q=80`;

export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Ecommerce Campaign Banner System',
    slug: 'ecommerce-campaign-banner-system',
    category: 'Ecommerce',
    tags: ['Graphic Design', 'Ecommerce', 'Branding'],
    year: 2025,
    role: 'Lead Designer',
    tools: ['Figma', 'Photoshop', 'After Effects'],
    description: 'A conversion-focused visual system for paid social and storefront campaigns.',
    content: 'Created an 8-point modular campaign system with flexible headline, CTA and promo blocks for multi-market launches.',
    featured: true,
    cover_type: 'image',
    cover_url: cover(80903),
    cover_thumb_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'CPAS Performance Ad Creatives',
    slug: 'cpas-performance-ad-creatives',
    category: 'Graphic Design',
    tags: ['Graphic Design', 'Ecommerce', 'Motion'],
    year: 2024,
    role: 'Art Director',
    tools: ['Illustrator', 'Premiere Pro'],
    description: 'Ad set designed for Meta CPAS with rapid test variants.',
    content: 'Built static and motion creatives optimized for funnel stage and audience cluster.',
    featured: true,
    cover_type: 'image',
    cover_url: cover(82903),
    cover_thumb_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'TikTok Live Overlays Kit',
    slug: 'tiktok-live-overlays-kit',
    category: 'Motion',
    tags: ['Motion', 'Video Editing', 'Branding'],
    year: 2025,
    role: 'Motion Designer',
    tools: ['After Effects', 'Premiere Pro'],
    description: 'Dynamic overlays and countdown scenes for livestream selling.',
    content: 'Designed reusable scenes for flash-sale modules, product pops and chat prompts.',
    featured: true,
    cover_type: 'video',
    cover_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cover_thumb_url: cover(84903),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Motion SaaS Demo Storyboard',
    slug: 'motion-saas-demo-storyboard',
    category: 'UI/UX',
    tags: ['UI/UX', 'Motion', 'Video Editing'],
    year: 2024,
    role: 'Product Motion Designer',
    tools: ['Figma', 'After Effects'],
    description: 'SaaS product demo concept for launch page and social cutdowns.',
    content: 'Mapped user flows into storyboard sequences and created animated UI moments.',
    featured: true,
    cover_type: 'image',
    cover_url: cover(86903),
    cover_thumb_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Wordmark + Brand Starter Pack',
    slug: 'wordmark-brand-starter-pack',
    category: 'Branding',
    tags: ['Branding', 'Graphic Design'],
    year: 2023,
    role: 'Brand Designer',
    tools: ['Illustrator', 'Figma'],
    description: 'Identity direction with primary wordmark and ecommerce color system.',
    content: 'Delivered logo lockups, spacing rules, typography styles and social templates.',
    featured: false,
    cover_type: 'image',
    cover_url: cover(88903),
    cover_thumb_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Video Edit Reel 2025',
    slug: 'video-edit-reel-2025',
    category: 'Video Editing',
    tags: ['Video Editing', 'Motion'],
    year: 2025,
    role: 'Video Editor',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Highlight reel with ecommerce hooks and retention-first pacing.',
    content: 'Compiled short-form cuts with punchy transitions and rhythm-matched audio.',
    featured: true,
    cover_type: 'video',
    cover_url: 'https://www.w3schools.com/html/movie.mp4',
    cover_thumb_url: cover(90903),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const fallbackMedia: ProjectMedia[] = Array.from({ length: 6 }).flatMap((_, i) => {
  const projectId = String(i + 1);
  return Array.from({ length: 4 }).map((__, idx) => ({
    id: `${projectId}-${idx}`,
    project_id: projectId,
    type: idx === 2 ? 'video' : 'image',
    url: idx === 2 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : cover(80903 + i * 1000 + idx * 101),
    thumb_url: cover(80903 + i * 1000 + idx * 91),
    sort_order: idx
  }));
});

export async function getProfile() {
  if (!hasSupabaseEnv) return fallbackProfile;
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('profiles').select('*').limit(1).single();
  return (data as Profile) ?? fallbackProfile;
}

export async function getProjects() {
  if (!hasSupabaseEnv) return fallbackProjects;
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('projects').select('*').order('year', { ascending: false });
  return ((data as Project[])?.length ? data : fallbackProjects).map((p) => ({
    ...p,
    tags: p.tags?.length ? p.tags : FILTERS.slice(0, 2),
    tools: p.tools?.length ? p.tools : ['Figma']
  }));
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 6);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  if (!hasSupabaseEnv) {
    return {
      project,
      media: fallbackMedia.filter((item) => item.project_id === project.id),
      nextProject
    };
  }

  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', project.id)
    .order('sort_order', { ascending: true });

  return {
    project,
    media: ((data as ProjectMedia[])?.length ? data : fallbackMedia.filter((item) => item.project_id === project.id)),
    nextProject
  };
}
