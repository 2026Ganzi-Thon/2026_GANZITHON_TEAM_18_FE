import ScoreRing from '../../ui/score-ring/ScoreRing';
import './ScoreSummary.css';

export default function ScoreSummary({ score, scale }) {
  return (
    <section className="score-summary" aria-label="최종 점수">
      <div className="score-summary__text">
        <p className="score-summary__label">최종 점수</p>
        <p className="score-summary__score">{score}점</p>
      </div>
      <ScoreRing score={score} scale={scale} />
    </section>
  );
}
