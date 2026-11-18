import { create } from './lib/store';
import { CONFIDENCE_DEFAULT, DEFAULT_MAX_TURNS } from './constants/limits';
import { SESSION_STATUS, SITUATION_TYPE } from './constants/enums';
import { createId } from './models/simulation';

const emptyContact = () => ({
  id: null,
  name: '',
  relationCategory: '',
  relationDetail: null,
  personalityTag: null,
  speechStyle: null,
});

/**
 * 시뮬레이션 상태 (FE 메모리). 새로고침하면 사라집니다.
 * - 설정 입력값: 대화연습1~3에서 채움 → 시작할 때 SimulationSetup으로 묶음
 * - session: 데이터구조설계 2-2 SimulationSession
 */
export const usePracticeStore = create((set, get) => ({
  // 대화연습1~3 입력값
  userName: '',
  contact: emptyContact(),
  goalKey: null, // constants/practice GOAL_OPTIONS[].key 또는 CUSTOM_GOAL_KEY
  goal: '',
  goalTag: null,
  situationType: SITUATION_TYPE.GENERAL_REQUEST, // ⚠️ 디자인에 선택 UI 없음 → 기본값
  /** @type {import('./models/simulation').ConflictContext|null} 충돌 정리에서 넘겨받음 (필수, 11/15 확정 — 없으면 대화 연습 진입 불가) */
  conflictContext: null,
  confidenceBefore: CONFIDENCE_DEFAULT,
  /** 자신감 슬라이더를 한 번이라도 움직였는지 (아니면 기본값 5 그대로라 변화를 말할 수 없음) */
  confidenceTouched: false,
  /** 연습 전 기분 (MOOD, 선택 안 하면 null) */
  moodBefore: null,

  /** @type {import('./models/simulation').SimulationSession|null} */
  session: null,
  /** @type {import('./models/simulation').Hint|null} */
  hint: null,
  confidenceAfter: null,
  moodAfter: null,

  setUserName: (userName) => set({ userName }),

  /**
   * 충돌 정리에서 넘어올 때 호출. 상대 이름·관계는 summary 값으로 자동으로 채움 (회의 결정: 자동 반영).
   * 새 충돌 건이므로 이전 목표·세션은 비웁니다.
   */
  setConflictContext: (conflictContext) => {
    const summary = conflictContext?.summary ?? {};
    set({
      conflictContext,
      contact: {
        ...emptyContact(),
        name: summary.counterpartName ?? '',
        relationCategory: summary.relationCategory ?? '',
        relationDetail: summary.relationDetail ?? null,
      },
      goalKey: null,
      goal: '',
      goalTag: null,
      session: null,
      hint: null,
      confidenceAfter: null,
      moodAfter: null,
      confidenceTouched: false,
    });
  },
  setContact: (patch) => set((s) => ({ contact: { ...s.contact, ...patch } })),
  setGoal: ({ goalKey, goal, goalTag }) => set({ goalKey, goal, goalTag }),
  setConfidenceBefore: (confidenceBefore) => set({ confidenceBefore }),
  setConfidenceAfter: (confidenceAfter) => set({ confidenceAfter }),
  setMoodBefore: (moodBefore) => set({ moodBefore }),
  markConfidenceTouched: () => set({ confidenceTouched: true }),
  setMoodAfter: (moodAfter) => set({ moodAfter }),

  /** 입력값으로 SimulationSetup 만들기 */
  buildSetup: () => {
    const s = get();
    const { id: _id, ...contact } = s.contact;
    return {
      userName: s.userName.trim(),
      contact: { ...contact, name: contact.name.trim() },
      situationType: s.situationType,
      goal: s.goal,
      goalTag: s.goalTag,
      conflictContext: s.conflictContext,
    };
  },

  /** 새 세션. setup을 넘기면 그대로 사용 (다시 하기) */
  beginSession: (setup) => {
    const session = {
      id: createId(),
      setup: setup ?? get().buildSetup(),
      messages: [],
      status: SESSION_STATUS.IN_PROGRESS,
      endReason: null,
      report: null,
      maxTurns: DEFAULT_MAX_TURNS,
    };
    set({ session, hint: null, confidenceAfter: null, moodAfter: null });
    return session;
  },

  updateSession: (patch) => set((s) => (s.session ? { session: { ...s.session, ...patch } } : {})),
  addMessage: (message) =>
    set((s) => (s.session ? { session: { ...s.session, messages: [...s.session.messages, message] }, hint: null } : {})),
  /** 전송 실패한 메시지를 대화 기록에서 되돌림 */
  removeMessage: (id) =>
    set((s) => (s.session ? { session: { ...s.session, messages: s.session.messages.filter((m) => m.id !== id) } } : {})),
  setHint: (hint) => set({ hint }),
}));
