import { DEFAULT_SCORE_SCALE } from '../../constants/limits';
import bubblesImg from '../../assets/images/bubbles.png';
import './ScoreRing.css';

const SIZE = 64;
const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** 점수 비율만큼 차는 원형 링 + 가운데 말풍선 아이콘. scale: 리포트 scoreScale */
export default function ScoreRing({ score, scale = DEFAULT_SCORE_SCALE }) {
  const ratio = Math.max(0, Math.min(1, scale > 0 ? score / scale : 0));
  return (
    <div className="score-ring" aria-hidden>
      <svg className="score-ring__svg" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE * ratio} ${CIRCUMFERENCE}`}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <img className="score-ring__icon" src={bubblesImg} alt="" width="44" height="44" />
    </div>
  );
}
