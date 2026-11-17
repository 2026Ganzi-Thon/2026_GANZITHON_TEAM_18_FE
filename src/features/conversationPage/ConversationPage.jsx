import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import PartnerSetupPage from './steps/partner-setup-page/PartnerSetupPage';
import PeoplePage from './steps/people-page/PeoplePage';
import PersonalityPage from './steps/personality-page/PersonalityPage';
import GoalPage from './steps/goal-page/GoalPage';
import ChatPage from './steps/chat-page/ChatPage';
import FeedbackReportPage from './steps/feedback-report-page/FeedbackReportPage';
import { usePracticeStore } from './practiceStore';
import { getProfile } from './storage/profile';
import { STEP } from './routes';

import './ConversationPage.css';

const STEP_PAGES = {
  [STEP.PARTNER]: PartnerSetupPage,
  [STEP.PEOPLE]: PeoplePage,
  [STEP.PERSONALITY]: PersonalityPage,
  [STEP.GOAL]: GoalPage,
  [STEP.CHAT]: ChatPage,
  [STEP.REPORT]: FeedbackReportPage,
};

/**
 * 대화 연습 탭 (AI 대화 연습).
 * /conversation?step=personality 처럼 쿼리로 단계를 고릅니다 (없거나 모르는 값이면 상대 설정).
 * 충돌 정리에서 넘겨준 conflictContext(location.state)를 받아 store에 넣습니다.
 */
export default function ConversationPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state?.conflictContext;
  const [contextReady, setContextReady] = useState(!incoming);

  useEffect(() => {
    if (!incoming) {
      setContextReady(true);
      return;
    }
    const store = usePracticeStore.getState();
    const requestedName = location.state?.userName?.trim();
    if (requestedName && !store.userName.trim()) store.setUserName(requestedName);
    if (!store.userName.trim() && !requestedName) {
      store.setUserName(getProfile().name?.trim() || '나');
    }
    store.setConflictContext(incoming);
    setContextReady(true);
    // 한 번 받은 뒤 history state를 비워, 뒤로 가기로 돌아와도 진행 내용이 초기화되지 않게 함
    navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
  }, [incoming, location.pathname, location.search, location.state?.userName, navigate]);

  const StepPage = STEP_PAGES[searchParams.get('step')] ?? PartnerSetupPage;

  if (!contextReady) return <div className="conversation-root" aria-busy="true" />;

  return (
    <div className="conversation-root">
      <StepPage />
    </div>
  );
}
