'use server';

import db from '@/lib/db';

export const action_createConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  return await db.conversation.create({
    data: { memberOneId, memberTwoId },
    include: {
      memberOne: { include: { profile: true } },
      memberTwo: { include: { profile: true } },
    },
  });
};
