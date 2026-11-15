import DotGauge from '../../ui/dot-gauge/DotGauge';
import { CRITERION_LABEL } from '../../constants/labels';
import './CriteriaScoreList.css';

/** @param {{ items: import('../../models/simulation').Report['items'], scale: number }} props */
export default function CriteriaScoreList({ items, scale }) {
  return (
    <section className="criteria-score-list" aria-label="항목별 점수">
      <ul className="criteria-score-list__list">
        {items.map((item) => (
          <li key={item.criterion} className="criteria-score-list__item">
            <div className="criteria-score-list__head">
              <span className="criteria-score-list__name">{CRITERION_LABEL[item.criterion] ?? item.criterion}</span>
              <DotGauge score={item.score} scale={scale} />
            </div>
            <p className="criteria-score-list__comment">{item.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
