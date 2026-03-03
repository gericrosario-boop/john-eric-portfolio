import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient, hasSupabaseEnv } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseEnv) {
    return <div className="container-shell py-12 text-sm text-muted-foreground">Set Supabase env vars to enable admin dashboard.</div>;
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/admin/login');

  return (
    <div className="container-shell space-y-6 py-10">
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        <Button asChild variant="ghost" size="sm"><Link href="/admin/projects">Projects</Link></Button>
        <Button asChild variant="ghost" size="sm"><Link href="/admin/media">Media</Link></Button>
        <Button asChild variant="ghost" size="sm"><Link href="/admin/profile">Profile</Link></Button>
        <form action="/api/auth/logout" method="post"><Button type="submit" variant="outline" size="sm">Logout</Button></form>
      </div>
      {children}
    </div>
  );
}
