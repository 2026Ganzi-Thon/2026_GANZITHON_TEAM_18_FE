import { CUSTOM_GOAL_KEY, GOAL_OPTIONS } from '../../constants/practice';
import { cx } from '../../utils/cx';
import radioOn from '../../assets/icons/radio-on.svg';
import radioOff from '../../assets/icons/radio-off.svg';
import './GoalOptionList.css';

/**
 * 목표 라디오 + '직접 입력'. 직접 입력칸에 글을 쓰면 CUSTOM이 선택됩니다.
 * @param {{ selectedKey: string|null, customText: string,
 *           onChange: (next: { key: string, customText: string }) => void }} props
 */
export default function GoalOptionList({ selectedKey, customText, onChange }) {
  return (
    <div className="goal-option-list" role="radiogroup" aria-label="대화 목표">
      {GOAL_OPTIONS.map((o) => {
        const checked = selectedKey === o.key;
        return (
          <label key={o.key} className="goal-option-list__card">
            <input
              type="radio"
              name="goal"
              className="visually-hidden"
              value={o.key}
              checked={checked}
              onChange={() => onChange({ key: o.key, customText })}
            />
            <img src={checked ? radioOn : radioOff} alt="" width="22" height="22" />
            <span className="goal-option-list__label">{o.label}</span>
          </label>
        );
      })}
      <input
        type="text"
        className={cx(
          'goal-option-list__card',
          'goal-option-list__card--custom',
          selectedKey === CUSTOM_GOAL_KEY && 'goal-option-list__card--active',
        )}
        placeholder="직접 입력"
        aria-label="목표 직접 입력"
        maxLength={50}
        value={customText}
        onFocus={() => onChange({ key: CUSTOM_GOAL_KEY, customText })}
        onChange={(e) => onChange({ key: CUSTOM_GOAL_KEY, customText: e.target.value })}
      />
    </div>
  );
}
