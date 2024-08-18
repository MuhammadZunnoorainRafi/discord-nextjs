'use server';

import db from '@/lib/db';
import { ServerSchema } from '@/lib/schemas';
import { ServerType } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { action_initialProfile } from '../profile/initial-profile';
import { randomUUID } from 'crypto';

export const action_createServer = async (formData: ServerType) => {
  const res = await action_initialProfile();
  if (!res.profile) {
    return redirect('/auth/login');
  }
  const validation = ServerSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid Fields' };
  }

  const { name } = validation.data;
  let server;
  try {
    server = await db.server.create({
      data: {
        name,
        profileId: res.profile.id,
        inviteCode: randomUUID(),
        Channel: { create: [{ name: 'general', profileId: res.profile.id }] },
        Member: { create: [{ profileId: res.profile.id }] },
      },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Internal server error' };
  }
  revalidatePath(`/servers/${server.id}`);
  redirect(`/servers/${server.id}`);
};
