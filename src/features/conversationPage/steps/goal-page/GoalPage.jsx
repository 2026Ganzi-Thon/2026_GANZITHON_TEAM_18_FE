import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import EmojiSlider from '../../ui/emoji-slider/EmojiSlider';
import GoalOptionList from '../../components/goal-option-list/GoalOptionList';
import { usePracticeStore } from '../../practiceStore';
import { CUSTOM_GOAL_KEY, GOAL_OPTIONS } from '../../constants/practice';
import { ROUTES } from '../../routes';
import playIcon from '../../assets/icons/play.svg';
import './GoalPage.css';

/** 대화연습3: 대화 목표 + 지금 기분(자신감) */
export default function GoalPage() {
  const navigate = useNavigate();
  const contact = usePracticeStore((s) => s.contact);
  const savedKey = usePracticeStore((s) => s.goalKey);
  const savedGoal = usePracticeStore((s) => s.goal);
  const savedConfidence = usePracticeStore((s) => s.confidenceBefore);
  const { setGoal, setConfidenceBefore } = usePracticeStore.getState();

  const [goalKey, setGoalKey] = useState(savedKey ?? GOAL_OPTIONS[0].key);
  const [customText, setCustomText] = useState(savedKey === CUSTOM_GOAL_KEY ? savedGoal : '');
  const [confidence, setConfidence] = useState(savedConfidence);

  if (!contact.personalityTag) {
    return <Navigate to={ROUTES.PRACTICE_PERSONALITY} replace />;
  }

  const isCustom = goalKey === CUSTOM_GOAL_KEY;
  const isValid = isCustom ? customText.trim().length > 0 : Boolean(goalKey);

  const startPractice = () => {
    const option = GOAL_OPTIONS.find((o) => o.key === goalKey);
    setGoal({
      goalKey,
      goal: isCustom ? customText.trim() : option.label,
      goalTag: isCustom ? null : option.goalTag,
    });
    setConfidenceBefore(confidence);
    // restart: 채팅 화면에서 새 세션으로 시작
    navigate(ROUTES.PRACTICE_CHAT, { state: { restart: true } });
  };

  return (
    <Screen
      className="goal-page"
      header={<PageHeader title="AI 대화 연습" onBack={() => navigate(ROUTES.PRACTICE_PERSONALITY)} />}
      footer={
        <Button icon={playIcon} disabled={!isValid} onClick={startPractice}>
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
        <EmojiSlider value={confidence} onChange={setConfidence} />
      </section>
    </Screen>
  );
}
