# John Eric Portfolio (Next.js 14 + Supabase)

Production-ready, mobile-first portfolio web app for **John Eric** (Graphic Designer, Video Editor, UI/UX, Motion, Music Producer/DJ).

## Stack
- Next.js 14 App Router
- Tailwind CSS + reusable UI components (shadcn-style)
- Framer Motion (subtle card interactions)
- Supabase (Postgres, Auth email/password, Storage)
- Deploy target: Vercel

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from template:
   ```bash
   cp .env.example .env.local
   ```
3. Fill env vars from Supabase project settings.
4. Run dev server:
   ```bash
   npm run dev
   ```

## Supabase setup
1. Create a Supabase project.
2. In SQL editor, run migration:
   - `supabase/migrations/001_init.sql`
3. Enable Email/Password auth in **Authentication → Providers**.
4. Create storage bucket:
   - Name: `project-assets`
   - Public bucket enabled
5. Bucket policy (Storage → Policies): allow public `select`; allow authenticated `insert/update/delete`.

## Data model
- `profiles`
- `projects`
- `project_media`
- `contact_submissions`

Schema and RLS are defined in `supabase/migrations/001_init.sql`.

## Admin workflow
### Login
- Go to `/admin/login`
- Authenticate with Supabase email/password user.

### Upload new work
1. Upload cover/gallery assets in `/admin/media`.
2. Copy returned public URL.
3. Open `/admin/projects` and create/edit project:
   - Title, slug, category, tags, year, role, tools
   - Description and case study content
   - Cover type (`image` or `video`), cover URL, optional thumbnail URL
   - Toggle `featured` if needed
4. Save project.

### Update profile
- Open `/admin/profile` and update hero title/subtitle, bio, socials, image URL.

## Deploy to Vercel
1. Push repo to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
5. Set `NEXT_PUBLIC_SITE_URL` to production domain (e.g. `https://yourdomain.com`).

## Notes
- Site includes SEO metadata, OpenGraph metadata, `sitemap.xml`, and `robots.txt`.
- Media is lazy-loaded where relevant and optimized with `next/image` for images.
- If Supabase env vars are missing, the app uses rich fallback sample data (6 seeded projects, mixed image/video covers).
