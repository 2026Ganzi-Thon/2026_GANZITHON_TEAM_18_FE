import { useSearchParams } from 'react-router-dom';

import PartnerSetupPage from './steps/partner-setup-page/PartnerSetupPage';
import PersonalityPage from './steps/personality-page/PersonalityPage';
import GoalPage from './steps/goal-page/GoalPage';
import ChatPage from './steps/chat-page/ChatPage';
import FeedbackReportPage from './steps/feedback-report-page/FeedbackReportPage';
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
 */
export default function MessagePage() {
  const [searchParams] = useSearchParams();
  const StepPage = STEP_PAGES[searchParams.get('step')] ?? PartnerSetupPage;

  return (
    <div className="message-root">
      <StepPage />
    </div>
  );
}
