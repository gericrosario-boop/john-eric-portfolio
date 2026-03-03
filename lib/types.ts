export type Socials = {
  instagram?: string;
  behance?: string;
  dribbble?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
};

export type Profile = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  bio: string;
  profile_image_url: string | null;
  socials: Socials;
  updated_at: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  year: number;
  role: string;
  tools: string[];
  description: string;
  content: string;
  featured: boolean;
  cover_type: 'image' | 'video';
  cover_url: string;
  cover_thumb_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectMedia = {
  id: string;
  project_id: string;
  type: 'image' | 'video';
  url: string;
  thumb_url: string | null;
  sort_order: number;
};
