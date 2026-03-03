'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient, hasSupabaseEnv } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabaseEnv) {
      setError('Supabase env missing.');
      return;
    }
    const supabase = createBrowserSupabaseClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push('/admin/projects');
    router.refresh();
  };

  return (
    <div className="container-shell py-16">
      <form className="mx-auto max-w-sm space-y-4 rounded-2xl border p-6" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">Login</Button>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </form>
    </div>
  );
}
