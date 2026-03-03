import { getProfile } from '@/lib/data';
import { ProfileAdminClient } from './profile-admin-client';

export default async function AdminProfilePage() {
  const profile = await getProfile();
  return <ProfileAdminClient profile={profile} />;
}
