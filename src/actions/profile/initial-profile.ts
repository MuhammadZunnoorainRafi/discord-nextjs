'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export const action_initialProfile = async () => {
  const user = await getUserServer();

  if (!user || !user.name || !user.email || !user.id) {
    return redirect('/auth/login');
  }

  try {
    const existingProfile = await db.profile.findUnique({
      where: { userId: user.id },
    });
    if (existingProfile) {
      return { profile: existingProfile };
    } else {
      const newProfile = await db.profile.create({
        data: { name: user.name, email: user.email, userId: user.id },
      });
      return { profile: newProfile };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
