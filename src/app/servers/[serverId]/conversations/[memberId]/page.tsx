import db from '@/lib/db';
import { getOrCreateConversation } from '@/procedures/chat/getOrCreateConversation';
import { getCurrentProfile } from '@/procedures/user/getCurrentProfile';
import { redirect } from 'next/navigation';
import React from 'react';
type Props = {
  params: {
    memberId: string;
  };
};
async function MemberConversatoinPage({ params }: Props) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return redirect('/auth/login');
  }

  const currentMember = await db.member.findFirst({
    where: { profileId: profile.id },
    include: { profile: true },
  });

  if (!currentMember) {
    return redirect('/auth/login');
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect('/auth/login');
  }

  const { memberOne, memberTwo } = conversation;
  const othereMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div>
      <h1 className="font-mono font-bold text-lg border-b-4 border-slate-400">
        {othereMember.profile.name}
      </h1>
    </div>
  );
}

export default MemberConversatoinPage;
