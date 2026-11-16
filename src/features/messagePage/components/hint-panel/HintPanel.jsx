import Bulb from '../bulb/Bulb';
import './HintPanel.css';

/** @param {{ hint: import('../../models/simulation').Hint }} props */
export default function HintPanel({ hint }) {
  return (
    <aside className="hint-panel" aria-label="힌트">
      <p className="hint-panel__head">
        <span className="hint-panel__badge">
          <Bulb size={20} />
          힌트
        </span>
        <span aria-hidden>·</span>
        <span className="hint-panel__direction">{hint.direction}</span>
      </p>
      {hint.keywords?.length > 0 && (
        <ul className="hint-panel__keywords">
          {hint.keywords.map((k) => (
            <li key={k} className="hint-panel__chip">
              {k}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
