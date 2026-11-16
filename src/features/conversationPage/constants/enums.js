// BE 코드값(Enum) — TalkFile_API설계.md 1장과 1:1로 맞춤. 표시 라벨은 labels.js

export const MOOD = Object.freeze({
  JOY: 'JOY',
  SADNESS: 'SADNESS',
  ANGER: 'ANGER',
  WORRY: 'WORRY',
  NEUTRAL: 'NEUTRAL',
});

export const RESPONSE_TYPE = Object.freeze({
  ACCEPT: 'ACCEPT',
  CONDITIONAL: 'CONDITIONAL',
  DECLINE: 'DECLINE',
});

/** 관계 분류 (7개 초안 — FE 선택지와 맞출 것) */
export const RELATION_CATEGORY = Object.freeze({
  COLLEAGUE: 'COLLEAGUE',
  SENIOR: 'SENIOR',
  JUNIOR: 'JUNIOR',
  FRIEND: 'FRIEND',
  PARTNER: 'PARTNER',
  FAMILY: 'FAMILY',
  OTHER: 'OTHER',
});

/** 성격 태그 (단일 선택) */
export const PERSONALITY_TAG = Object.freeze({
  EMOTIONAL: 'EMOTIONAL',
  PUSHY: 'PUSHY',
  LOGICAL: 'LOGICAL',
  GUILT_TRIP: 'GUILT_TRIP',
  COOL: 'COOL',
});

export const SITUATION_TYPE = Object.freeze({
  GENERAL_REQUEST: 'GENERAL_REQUEST',
  RE_PERSUASION: 'RE_PERSUASION',
});

/** 목표 태그 (미정 — 회의록 초안 4개) */
export const GOAL_TAG = Object.freeze({
  CLEAR_INTENT: 'CLEAR_INTENT',
  STATE_LIMIT: 'STATE_LIMIT',
  HOLD_POSITION: 'HOLD_POSITION',
  RELATIONSHIP: 'RELATIONSHIP',
});

/** 평가 항목 */
export const CRITERION = Object.freeze({
  CLARITY: 'CLARITY',
  LIMIT_CONDITION: 'LIMIT_CONDITION',
  CONSISTENCY: 'CONSISTENCY',
  RESPECT: 'RESPECT',
  HABIT: 'HABIT',
  ALTERNATIVE: 'ALTERNATIVE',
});

export const SENDER = Object.freeze({
  USER: 'USER',
  AI: 'AI',
});

export const END_REASON = Object.freeze({
  USER: 'USER',
  AI: 'AI',
  MAX_TURNS: 'MAX_TURNS',
});

/** 시뮬레이션 진행 상태 (FE 전용) */
export const SESSION_STATUS = Object.freeze({
  IN_PROGRESS: 'IN_PROGRESS',
  ENDED: 'ENDED',
});

/** 전·후 체크인 시점 (FE 전용, PoC) */
export const CHECK_IN_PHASE = Object.freeze({
  BEFORE: 'BEFORE',
  AFTER: 'AFTER',
});
