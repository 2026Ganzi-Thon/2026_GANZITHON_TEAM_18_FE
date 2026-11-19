import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import EmojiSlider from '../../ui/emoji-slider/EmojiSlider';
import GoalOptionList from '../../components/goal-option-list/GoalOptionList';
import MoodPicker from '../../components/mood-picker/MoodPicker';
import Modal from '../../ui/modal/Modal';
import { SENDER } from '../../constants/enums';
import { usePracticeStore } from '../../practiceStore';
import { CUSTOM_GOAL_KEY, GOAL_OPTIONS } from '../../constants/practice';
import { ROUTES } from '../../routes';
import playIcon from '../../assets/icons/play.svg';
import './GoalPage.css';

/** 대화연습4: 대화 목표 + 지금 기분(자신감 슬라이더 + 기분 체크) */
export default function GoalPage() {
  const navigate = useNavigate();
  const contact = usePracticeStore((s) => s.contact);
  const savedKey = usePracticeStore((s) => s.goalKey);
  const savedGoal = usePracticeStore((s) => s.goal);
  const savedConfidence = usePracticeStore((s) => s.confidenceBefore);
  const savedMood = usePracticeStore((s) => s.moodBefore);
  // 리포트 전 단계에서 내가 한 번이라도 말한 대화가 있으면 '진행 중'으로 봄
  // (AI가 대화를 마무리했지만 아직 결과를 안 본 경우도 포함)
  const hasOngoingChat = usePracticeStore(
    (s) =>
      Boolean(s.session) &&
      !s.session.report &&
      s.session.messages.some((m) => m.sender === SENDER.USER),
  );
  const { setGoal, setConfidenceBefore, setMoodBefore, markConfidenceTouched } = usePracticeStore.getState();

  const [goalKey, setGoalKey] = useState(savedKey ?? GOAL_OPTIONS[0].key);
  const [customText, setCustomText] = useState(savedKey === CUSTOM_GOAL_KEY ? savedGoal : '');
  const [confidence, setConfidence] = useState(savedConfidence);
  const [mood, setMood] = useState(savedMood);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!contact.personalityTag) {
    return <Navigate to={ROUTES.PRACTICE_PERSONALITY} replace />;
  }

  const isCustom = goalKey === CUSTOM_GOAL_KEY;
  const isValid = isCustom ? customText.trim().length > 0 : Boolean(goalKey);

  // 채팅 중 뒤로 왔다가 다시 시작을 누르면, 지금 대화를 지우기 전에 먼저 물어봄
  const onStartClick = () => {
    if (hasOngoingChat) setConfirmOpen(true);
    else startPractice();
  };

  // 이어서 하기: 설정은 바꾸지 않고 진행 중이던 대화로 돌아감
  const continuePractice = () => {
    setConfirmOpen(false);
    navigate(ROUTES.PRACTICE_CHAT);
  };

  const startPractice = () => {
    setConfirmOpen(false);
    const option = GOAL_OPTIONS.find((o) => o.key === goalKey);
    setGoal({
      goalKey,
      goal: isCustom ? customText.trim() : option.label,
      goalTag: isCustom ? null : option.goalTag,
    });
    setConfidenceBefore(confidence);
    setMoodBefore(mood);
    // restart: 채팅 화면에서 새 세션으로 시작
    navigate(ROUTES.PRACTICE_CHAT, { state: { restart: true } });
  };

  // 주변 인물에서 불러와 성격을 건너뛰었어도, 뒤로가기로 성격 선택(현재 성격이 골라진 상태)에서 바꿀 수 있음
  return (
    <Screen
      className="goal-page"
      header={<PageHeader title="AI 대화 연습" onBack={() => navigate(ROUTES.PRACTICE_PERSONALITY)} />}
      footer={
        <Button icon={playIcon} disabled={!isValid} onClick={onStartClick}>
          연습 시작하기
        </Button>
      }
    >
      <h2 className="goal-page__heading">이번 대화의 목표가 무엇인가요?</h2>
      <div className="goal-page__goals">
        <GoalOptionList
          selectedKey={goalKey}
          customText={customText}
          onChange={({ key, customText: text }) => {
            setGoalKey(key);
            setCustomText(text);
          }}
        />
      </div>

      <section className="goal-page__mood">
        <h2 className="goal-page__heading">지금 기분이 어떠신가요?</h2>
        <div className="goal-page__mood-cards">
          <EmojiSlider
            value={confidence}
            onChange={(v) => {
              setConfidence(v);
              markConfidenceTouched();
            }}
          />
          <MoodPicker value={mood} onChange={setMood} label="지금 기분" />
        </div>
      </section>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        labelledBy="goal-page-confirm-title"
        className="goal-page__confirm"
      >
        <h2 id="goal-page-confirm-title" className="goal-page__confirm-title">
          진행 중인 대화가 있어요
        </h2>
        <p className="goal-page__confirm-text">새로 시작하면 지금까지 나눈 대화는 사라져요.</p>
        <div className="goal-page__confirm-actions">
          <Button variant="outline" fullWidth onClick={continuePractice}>
            이어서 하기
          </Button>
          <Button onClick={startPractice}>새로 시작하기</Button>
        </div>
      </Modal>
    </Screen>
  );
}
