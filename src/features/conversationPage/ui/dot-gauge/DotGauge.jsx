import { DEFAULT_SCORE_SCALE, GAUGE_STEPS } from '../../constants/limits';
import { cx } from '../../utils/cx';
import './DotGauge.css';

/** 점수를 5칸 막대로 표시. scale: 리포트 scoreScale */
export default function DotGauge({ score, scale = DEFAULT_SCORE_SCALE }) {
  const ratio = scale > 0 ? score / scale : 0;
  const filled = Math.max(0, Math.min(GAUGE_STEPS, Math.round(ratio * GAUGE_STEPS)));
  return (
    <div className="dot-gauge" role="img" aria-label={`${GAUGE_STEPS}칸 중 ${filled}칸`}>
      {Array.from({ length: GAUGE_STEPS }, (_, i) => (
        <span key={i} className={cx('dot-gauge__dot', i < filled && 'dot-gauge__dot--on')} />
      ))}
    </div>
  );
}
