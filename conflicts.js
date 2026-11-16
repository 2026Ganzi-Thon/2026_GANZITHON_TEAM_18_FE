import { post } from './client';

/**
 * POST /conflicts/chat — 충돌 정리 챗봇 (2-1)
 * - messages 가 빈 배열이면 첫 인사와 첫 추천 태그만 내려옵니다.
 * - mood 는 아직 없으면 null.
 * - 응답의 newSchedules / newRoles 는 BE가 준 id 그대로 profile 에 추가하세요.
 *
 * @param {object} params
 * @param {{schedules: object[], roles: object[]}} params.profile
 * @param {string|null} [params.mood]
 * @param {{sender: 'USER'|'AI', content: string}[]} [params.messages] 마지막 항목이 이번 사용자 메시지
 * @param {AbortSignal} [params.signal]
 */
export function chatConflict({ profile, mood = null, messages = [], signal }) {
  return post(
    '/conflicts/chat',
    {
      profile: {
        schedules: profile?.schedules ?? [],
        roles: profile?.roles ?? [],
      },
      mood,
      messages,
    },
    { signal },
  );
}

/**
 * POST /conflicts/drafts — 메시지 초안 생성·수정 (2-6)
 * - 첫 생성: currentDraft 없음, messages 빈 배열
 * - 수정 요청: currentDraft 에 최신 초안, messages 에 수정 대화 (마지막이 이번 요청)
 * - availableCondition 은 responseType 이 CONDITIONAL 일 때 필수
 *
 * @returns {Promise<{draft: string, aiMessage: string}>}
 */
export function requestDraft({
  summary,
  relatedSchedules = [],
  responseType,
  availableCondition = null,
  currentDraft = null,
  messages = [],
  signal,
}) {
  return post(
    '/conflicts/drafts',
    {
      summary,
      relatedSchedules,
      responseType,
      availableCondition,
      currentDraft,
      messages,
    },
    { signal },
  );
}
