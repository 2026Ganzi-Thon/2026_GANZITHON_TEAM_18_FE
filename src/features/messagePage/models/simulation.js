// 객체 정의 (JSDoc) — TalkFile_데이터구조설계.md 3장과 같은 이름·구조

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {string} name
 * @property {string} relationCategory   RELATION_CATEGORY
 * @property {string|null} relationDetail 예: 동아리 선배
 * @property {string|null} personalityTag PERSONALITY_TAG
 * @property {string|null} speechStyle
 */

/**
 * @typedef {Object} Message
 * @property {'USER'|'AI'} sender
 * @property {string} content
 * @property {string} [createdAt]  FE 표시용 (요청에는 보내지 않음)
 * @property {string} [id]         FE 렌더링용 (요청에는 보내지 않음)
 */

/**
 * @typedef {Object} SimulationSetup
 * @property {string} userName
 * @property {Omit<Contact, 'id'>} contact
 * @property {string} situationType     SITUATION_TYPE
 * @property {string} goal              태그 선택 또는 직접 입력한 문장
 * @property {string|null} goalTag      GOAL_TAG
 * @property {object|null} conflictContext 충돌 정리에서 넘어온 경우만
 */

/**
 * @typedef {Object} Hint
 * @property {string} direction
 * @property {string[]} keywords
 */

/**
 * @typedef {Object} Report
 * @property {number} totalScore
 * @property {number} scoreScale
 * @property {string} summary
 * @property {{ criterion: string, score: number, comment: string }[]} items
 * @property {{ original: string, improved: string }[]} sentenceComparisons
 */

/**
 * @typedef {Object} SimulationSession
 * @property {string} id
 * @property {SimulationSetup} setup
 * @property {Message[]} messages
 * @property {'IN_PROGRESS'|'ENDED'} status
 * @property {string|null} endReason   END_REASON
 * @property {Report|null} report
 * @property {number} maxTurns
 */

/**
 * @typedef {Object} CheckIn
 * @property {string} simulationId
 * @property {'BEFORE'|'AFTER'} phase
 * @property {number} confidence  0~10
 * @property {number|null} burden 0~10 (디자인에 입력 UI가 없어 현재 null)
 * @property {string} createdAt
 */

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @returns {Message} */
export function createMessage(sender, content) {
  return { id: createId(), sender, content, createdAt: new Date().toISOString() };
}
