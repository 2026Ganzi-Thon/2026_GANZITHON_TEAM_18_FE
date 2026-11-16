import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import Button from '../../ui/button/Button';
import ChatHeader from '../../components/chat-header/ChatHeader';
import ChatBubble from '../../components/chat-bubble/ChatBubble';
import ChatInput from '../../components/chat-input/ChatInput';
import HintPanel from '../../components/hint-panel/HintPanel';
import PostMoodModal from '../../components/post-mood-modal/PostMoodModal';
import { usePracticeStore } from '../../practiceStore';
import { useSimulation } from '../../useSimulation';
import { SENDER } from '../../constants/enums';
import { relationText } from '../../constants/labels';
import { ROUTES } from '../../routes';
import checkIcon from '../../assets/icons/check.svg';
import './ChatPage.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * 채팅 + 팝업2(연습 후 기분)
 * 종료: ① 연습 마치기 버튼(endReason USER) ② AI가 마무리 판단(AI) ③ 턴 상한(MAX_TURNS)
 * ②③은 마지막 AI 메시지를 보여준 뒤 팝업2를 자동으로 띄움
 */
export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const goal = usePracticeStore((s) => s.goal);
  const hint = usePracticeStore((s) => s.hint);
  const confidenceBefore = usePracticeStore((s) => s.confidenceBefore);
  const sim = useSimulation();
  const contact = sim.session?.setup.contact ?? usePracticeStore.getState().contact;

  const [moodOpen, setMoodOpen] = useState(false);
  const [confidenceAfter, setConfidenceAfter] = useState(confidenceBefore);
  const bottomRef = useRef(null);
  const startedRef = useRef(false);

  // restart(목표 화면에서 시작 / 다시 하기) 또는 진행 중 세션이 없으면 새로 시작.
  // startedRef: StrictMode에서 effect가 두 번 실행돼도 한 번만 시작
  useEffect(() => {
    if (!goal || startedRef.current) return;
    startedRef.current = true;
    const { restart, sameSetup } = location.state ?? {};
    const current = usePracticeStore.getState().session;
    if (restart || !current) sim.start(sameSetup ? current?.setup : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AI 마무리 판단·턴 상한으로 끝나면 팝업2 자동 표시
  useEffect(() => {
    if (sim.isEnded && !sim.session?.report) setMoodOpen(true);
  }, [sim.isEnded, sim.session?.report]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [sim.messages.length, hint, sim.pending]);

  if (!goal) return <Navigate to={ROUTES.PRACTICE_GOAL} replace />;

  const busy = sim.pending !== null;
  const firstAt = sim.messages[0]?.createdAt;
  const lastIsUser = sim.messages.at(-1)?.sender === SENDER.USER;
  const inputLocked = busy || sim.isEnded || sim.isTurnLimitReached || sim.messages.length === 0;

  const submitMood = async () => {
    const report = await sim.finish(confidenceAfter);
    if (report) navigate(ROUTES.PRACTICE_REPORT);
  };

  return (
    <Screen
      className="chat-page"
      showTabBar={false}
      header={
        <ChatHeader
          partnerName={contact.name}
          relation={relationText(contact)}
          onBack={() => navigate(ROUTES.PRACTICE_GOAL)}
        />
      }
      footer={
        <>
          {sim.error && !moodOpen && (
            <p className="chat-page__error" role="alert">
              {sim.error}
            </p>
          )}
          <ChatInput
            onSend={sim.send}
            onHint={sim.requestHint}
            disabled={inputLocked}
            hintDisabled={Boolean(hint)}
            placeholder={sim.isEnded || sim.isTurnLimitReached ? '대화가 끝났어요. 연습을 마쳐 주세요.' : undefined}
          />
          <Button
            icon={checkIcon}
            iconSize={24}
            disabled={busy || sim.turnCount === 0}
            onClick={() => setMoodOpen(true)}
          >
            연습 마치기
          </Button>
        </>
      }
    >
      <div className="chat-page__log" aria-live="polite">
        {firstAt && <p className="chat-page__date">{formatDate(firstAt)}</p>}
        {sim.messages.map((m) => (
          <ChatBubble key={m.id} sender={m.sender} content={m.content} createdAt={m.createdAt} />
        ))}
        {(sim.pending === 'start' || (sim.pending === 'reply' && lastIsUser)) && (
          <ChatBubble sender={SENDER.AI} content={<span className="chat-page__typing">···</span>} />
        )}
        {hint && <HintPanel hint={hint} />}
        <div ref={bottomRef} />
      </div>

      <PostMoodModal
        open={moodOpen}
        value={confidenceAfter}
        onChange={setConfidenceAfter}
        // 대화가 이미 끝났으면(AI·턴 상한) 닫지 않고 결과로만 진행
        onClose={sim.isEnded ? undefined : () => setMoodOpen(false)}
        onSubmit={submitMood}
        submitting={sim.pending === 'report'}
        error={moodOpen ? sim.error : ''}
      />
    </Screen>
  );
}
