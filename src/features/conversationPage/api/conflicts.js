import { post, USE_MOCK } from './client';
import * as mock from './conflicts.mock';

/** Situation refinement. Every call includes the complete chat history. */
export function chatConflict(profile, mood, messages) {
  if (USE_MOCK) return mock.chatConflict(profile, mood, messages);
  return post('/conflicts/chat', { profile, mood, messages: messages.map(({ sender, content }) => ({ sender, content })) });
}

/** Create or revise a message draft from a ConflictContext. */
export function createMessageDraft(payload) {
  if (USE_MOCK) return mock.createMessageDraft(payload);
  return post('/conflicts/drafts', payload);
}
