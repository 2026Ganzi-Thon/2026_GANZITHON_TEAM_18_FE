/**
 * 대화 연습 단계 주소.
 * 팀 AppRouter는 /conversation 하나만 등록되어 있어서, 단계는 ?step= 쿼리로 나눕니다.
 */
export const STEP = Object.freeze({
  PARTNER: 'partner',
  PEOPLE: 'people',
  PERSONALITY: 'personality',
  GOAL: 'goal',
  CHAT: 'chat',
  REPORT: 'report',
});

const stepPath = (step) => `/conversation?step=${step}`;

/**
 * 충돌 정리 → 대화 연습 진입 (시뮬레이션의 유일한 진입 경로, 11/15 확정)
 * 충돌 정리 화면에서 ConflictSession으로 ConflictContext를 만들어 아래처럼 이동하면 됩니다.
 *   navigate(ROUTES.CONVERSATION, { state: { conflictContext } })
 * 상대 이름·관계는 conflictContext.summary 값으로 자동으로 채워집니다.
 */
export const ROUTES = Object.freeze({
  HOME: '/main', // 뒤로가기 목적지: 팀 메인 화면
  MAIN: '/main',
  CONVERSATION: '/conversation',
  REQUEST: '/request',
  PRACTICE_PARTNER: '/conversation',
  PRACTICE_PEOPLE: stepPath(STEP.PEOPLE),
  PRACTICE_PERSONALITY: stepPath(STEP.PERSONALITY),
  PRACTICE_GOAL: stepPath(STEP.GOAL),
  PRACTICE_CHAT: stepPath(STEP.CHAT),
  PRACTICE_REPORT: stepPath(STEP.REPORT),
});
