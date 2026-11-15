import { Navigate, useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import ScoreSummary from '../../components/score-summary/ScoreSummary';
import CriteriaScoreList from '../../components/criteria-score-list/CriteriaScoreList';
import SentenceCompare from '../../components/sentence-compare/SentenceCompare';
import ConfidenceChange from '../../components/confidence-change/ConfidenceChange';
import { usePracticeStore } from '../../practiceStore';
import { DEFAULT_SCORE_SCALE } from '../../constants/limits';
import { ROUTES } from '../../routes';
import reloadIcon from '../../assets/icons/reload.svg';
import './FeedbackReportPage.css';

/**
 * 피드백 리포트. 서버에 남지 않으므로 화면을 벗어나기 전까지 메모리(session.report)에서만 보여줌.
 * 전·후 자신감은 useSimulation에서 checkIns로 이미 저장됨.
 */
export default function FeedbackReportPage() {
  const navigate = useNavigate();
  const report = usePracticeStore((s) => s.session?.report);
  const before = usePracticeStore((s) => s.confidenceBefore);
  const after = usePracticeStore((s) => s.confidenceAfter);
  const { setConfidenceBefore } = usePracticeStore.getState();

  if (!report) return <Navigate to={ROUTES.PRACTICE_PARTNER} replace />;

  const scale = report.scoreScale || DEFAULT_SCORE_SCALE;

  // 다시 하기: 같은 setup으로 새 세션 + 시작 API 재호출. 이번 연습 후 자신감을 다음 연습 전 값으로
  const retry = () => {
    setConfidenceBefore(after ?? before);
    navigate(ROUTES.PRACTICE_CHAT, { replace: true, state: { restart: true, sameSetup: true } });
  };

  return (
    <Screen
      className="feedback-report-page"
      header={<PageHeader title="피드백 리포트" onBack={() => navigate(ROUTES.HOME)} />}
      footer={
        <Button icon={reloadIcon} iconSize={24} onClick={retry}>
          다시 연습하기
        </Button>
      }
    >
      <div className="feedback-report-page__stack">
        <ScoreSummary score={report.totalScore} scale={scale} />
        <CriteriaScoreList items={report.items} scale={scale} />
        {report.sentenceComparisons?.map((c, i) => (
          <div key={i} className="feedback-report-page__section feedback-report-page__section--spaced">
            <SentenceCompare comparison={c} />
          </div>
        ))}
        <div className="feedback-report-page__section feedback-report-page__section--spaced">
          <ConfidenceChange before={before} after={after ?? before} />
        </div>
      </div>
    </Screen>
  );
}
