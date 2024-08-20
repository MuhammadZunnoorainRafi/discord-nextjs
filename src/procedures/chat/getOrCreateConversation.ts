import { action_createConversation } from '@/actions/chat/create-conversation';
import { getConversation } from './getConversation';

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await getConversation(memberOneId, memberTwoId)) ||
    (await getConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await action_createConversation(memberOneId, memberTwoId);
  }

  return conversation;
};
