import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import PartnerSetupPage from './steps/partner-setup-page/PartnerSetupPage';
import PersonalityPage from './steps/personality-page/PersonalityPage';
import GoalPage from './steps/goal-page/GoalPage';
import ChatPage from './steps/chat-page/ChatPage';
import FeedbackReportPage from './steps/feedback-report-page/FeedbackReportPage';
import { usePracticeStore } from './practiceStore';
import { STEP } from './routes';

import './MessagePage.css';

const STEP_PAGES = {
  [STEP.PARTNER]: PartnerSetupPage,
  [STEP.PERSONALITY]: PersonalityPage,
  [STEP.GOAL]: GoalPage,
  [STEP.CHAT]: ChatPage,
  [STEP.REPORT]: FeedbackReportPage,
};

/**
 * 메시지 탭 = AI 대화 연습.
 * /message?step=personality 처럼 쿼리로 단계를 고릅니다 (없거나 모르는 값이면 상대 설정).
 * 충돌 정리에서 넘겨준 conflictContext(location.state)를 받아 store에 넣습니다.
 */
export default function MessagePage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state?.conflictContext;

  useEffect(() => {
    if (!incoming) return;
    usePracticeStore.getState().setConflictContext(incoming);
    // 한 번 받은 뒤 history state를 비워, 뒤로 가기로 돌아와도 진행 내용이 초기화되지 않게 함
    navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
  }, [incoming, location.pathname, location.search, navigate]);

  const StepPage = STEP_PAGES[searchParams.get('step')] ?? PartnerSetupPage;

  return (
    <div className="message-root">
      <StepPage />
    </div>
  );
}
