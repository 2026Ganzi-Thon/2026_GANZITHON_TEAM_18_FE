/**
 * 대화 연습 단계 주소.
 * 팀 AppRouter는 /message 하나만 등록되어 있어서, 단계는 ?step= 쿼리로 나눕니다.
 */
export const STEP = Object.freeze({
  PARTNER: 'partner',
  PERSONALITY: 'personality',
  GOAL: 'goal',
  CHAT: 'chat',
  REPORT: 'report',
});

const stepPath = (step) => `/message?step=${step}`;

export const ROUTES = Object.freeze({
  HOME: '/main', // 뒤로가기 목적지: 팀 메인 화면
  MAIN: '/main',
  MESSAGE: '/message',
  REQUEST: '/request',
  PRACTICE_PARTNER: '/message',
  PRACTICE_PERSONALITY: stepPath(STEP.PERSONALITY),
  PRACTICE_GOAL: stepPath(STEP.GOAL),
  PRACTICE_CHAT: stepPath(STEP.CHAT),
  PRACTICE_REPORT: stepPath(STEP.REPORT),
});
