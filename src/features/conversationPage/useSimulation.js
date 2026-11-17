import { useCallback, useState } from 'react';
import * as api from './api/simulation';
import { CHECK_IN_PHASE, END_REASON, SENDER, SESSION_STATUS } from './constants/enums';
import { createMessage } from './models/simulation';
import { saveCheckIn } from './storage/checkIns';
import { usePracticeStore } from './practiceStore';

const store = () => usePracticeStore.getState();

/** 시뮬레이션 시작·대화·힌트·리포트 호출과 종료 처리 */
export function useSimulation() {
  const session = usePracticeStore((s) => s.session);
  const [pending, setPending] = useState(null); // 'start' | 'reply' | 'hint' | 'report'
  const [error, setError] = useState('');

  const messages = session?.messages ?? [];
  const turnCount = messages.filter((m) => m.sender === SENDER.USER).length;
  const isEnded = session?.status === SESSION_STATUS.ENDED;

  const run = useCallback(async (kind, fn) => {
    setPending(kind);
    setError('');
    try {
      return await fn();
    } catch (e) {
      setError(e.message || '문제가 생겼어요. 다시 시도해 주세요.');
      return null;
    } finally {
      setPending(null);
    }
  }, []);

  /** 새 세션 시작. setup을 넘기면 같은 설정으로 다시 하기 */
  const start = useCallback(
    (setup) =>
      run('start', async () => {
        const s = store().beginSession(setup);
        saveCheckIn({
          simulationId: s.id,
          phase: CHECK_IN_PHASE.BEFORE,
          confidence: store().confidenceBefore,
          mood: store().moodBefore,
          createdAt: new Date().toISOString(),
        });
        const res = await api.startSimulation(s.setup);
        store().updateSession({ maxTurns: res.maxTurns || s.maxTurns });
        store().addMessage(createMessage(SENDER.AI, res.firstAiMessage));
        return res;
      }),
    [run],
  );

  const send = useCallback(
    (text) =>
      run('reply', async () => {
        const { session: s } = store();
        const mine = createMessage(SENDER.USER, text);
        store().addMessage(mine);
        const res = await api.chat(s.setup, [...s.messages, mine]);
        store().addMessage(createMessage(SENDER.AI, res.aiMessage));
        if (res.shouldEnd) {
          store().updateSession({ status: SESSION_STATUS.ENDED, endReason: res.endReason ?? END_REASON.AI });
        }
        return res;
      }),
    [run],
  );

  const requestHint = useCallback(
    () =>
      run('hint', async () => {
        const { session: s } = store();
        const hint = await api.getHint(s.setup, s.messages);
        store().setHint(hint);
        return hint;
      }),
    [run],
  );

  /** 연습 후 자신감·기분 기록 + 리포트 요청. 종료 버튼이면 endReason USER */
  const finish = useCallback(
    (confidenceAfter, moodAfter = null) =>
      run('report', async () => {
        const { session: s } = store();
        const endReason = s.endReason ?? END_REASON.USER;
        store().setConfidenceAfter(confidenceAfter);
        store().setMoodAfter(moodAfter);
        saveCheckIn({
          simulationId: s.id,
          phase: CHECK_IN_PHASE.AFTER,
          confidence: confidenceAfter,
          mood: moodAfter,
          createdAt: new Date().toISOString(),
        });
        const report = await api.getReport(s.setup, s.messages, endReason);
        store().updateSession({ status: SESSION_STATUS.ENDED, endReason, report });
        return report;
      }),
    [run],
  );

  return {
    session,
    messages,
    pending,
    error,
    turnCount,
    isEnded,
    isTurnLimitReached: Boolean(session) && turnCount >= session.maxTurns,
    start,
    send,
    requestHint,
    finish,
  };
}
