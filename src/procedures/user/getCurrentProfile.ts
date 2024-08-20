import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';

export const getCurrentProfile = async () => {
  const user = await getUserServer();
  return await db.profile.findUnique({ where: { userId: user?.id } });
};
