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
 * @property {ConflictContext|null} conflictContext 충돌 정리를 거쳤으면 채움, 바로 연습하면 null
 */

/**
 * 충돌 정리 챗봇이 정리한 정보 (충돌 정리 화면에서 받음)
 * @typedef {Object} ConflictSummary
 * @property {string|null} counterpartName
 * @property {string|null} relationCategory  RELATION_CATEGORY
 * @property {string|null} relationDetail    예: 동아리 선배
 * @property {string|null} requestContent
 * @property {string|null} deadlineText
 * @property {string|null} deadlineAt
 * @property {number|null} estimatedMinutes
 * @property {string|null} psychologicalContext
 * @property {string[]} relatedScheduleIds
 */

/**
 * 충돌 정리 → 시뮬레이션 연계용
 * @typedef {Object} ConflictContext
 * @property {ConflictSummary} summary
 * @property {string} responseType          RESPONSE_TYPE
 * @property {string|null} availableCondition
 * @property {object[]} relatedSchedules     Schedule[]
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
 * @property {number} confidence  0~10. 슬라이더 하나 (0 = 부담돼요, 10 = 자신있어요)
 * @property {string|null} mood   MOOD (기쁨/슬픔/화남/걱정/무념무상), 선택 안 하면 null
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
