import { cookies } from 'next/headers';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export function createBrowserSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabaseClient() {
  return createServerComponentClient({ cookies });
}

export function createServiceRoleClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
