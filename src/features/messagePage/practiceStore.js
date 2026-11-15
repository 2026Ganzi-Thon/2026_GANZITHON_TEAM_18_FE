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
  confidenceBefore: CONFIDENCE_DEFAULT,

  /** @type {import('./models/simulation').SimulationSession|null} */
  session: null,
  /** @type {import('./models/simulation').Hint|null} */
  hint: null,
  confidenceAfter: null,

  setUserName: (userName) => set({ userName }),
  setContact: (patch) => set((s) => ({ contact: { ...s.contact, ...patch } })),
  setGoal: ({ goalKey, goal, goalTag }) => set({ goalKey, goal, goalTag }),
  setConfidenceBefore: (confidenceBefore) => set({ confidenceBefore }),
  setConfidenceAfter: (confidenceAfter) => set({ confidenceAfter }),

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
      conflictContext: null,
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
    set({ session, hint: null, confidenceAfter: null });
    return session;
  },

  updateSession: (patch) => set((s) => (s.session ? { session: { ...s.session, ...patch } } : {})),
  addMessage: (message) =>
    set((s) => (s.session ? { session: { ...s.session, messages: [...s.session.messages, message] }, hint: null } : {})),
  setHint: (hint) => set({ hint }),
}));
