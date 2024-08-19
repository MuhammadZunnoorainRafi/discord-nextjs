import { action_initialProfile } from '@/actions/profile/initial-profile';
import { CreateServerForm } from '@/components/forms/CreateServerForm';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default async function Home() {
  const res = await action_initialProfile();
  if (res.error) {
    toast.error(res.error);
    return redirect('/auth/login');
  }

  const server = await db.server.findFirst({
    where: { Member: { some: { profileId: res.profile?.id } } },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <CreateServerForm />
    </div>
  );
}
