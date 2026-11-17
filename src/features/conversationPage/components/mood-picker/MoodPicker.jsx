import { useId } from 'react';
import { MOOD_OPTIONS } from '../../constants/practice';
import { cx } from '../../utils/cx';
import './MoodPicker.css';

/**
 * 기분 체크: 기쁨/슬픔/화남/걱정/무념무상 중 1탭 (다시 누르면 해제).
 * 선택된 기분은 컬러 이모지 + 흰 배경, 나머지는 회색 이모지.
 * @param {{ value: string|null, onChange: (v: string|null) => void, card?: boolean, label?: string }} props
 */
export default function MoodPicker({ value, onChange, card = true, label = '기분' }) {
  const name = useId();
  return (
    <div className={cx('mood-picker', card && 'mood-picker--card')} role="radiogroup" aria-label={label}>
      {MOOD_OPTIONS.map((o) => {
        const selected = o.value === value;
        return (
          <label key={o.value} className={cx('mood-picker__item', selected && 'mood-picker__item--selected')}>
            <input
              className="mood-picker__input"
              type="radio"
              name={name}
              value={o.value}
              checked={selected}
              onChange={() => onChange(o.value)}
              onClick={() => selected && onChange(null)}
            />
            <span className="mood-picker__label">{o.label}</span>
            <span className="mood-picker__emoji" aria-hidden>
              <img
                src={selected ? o.image : o.grayImage}
                alt=""
                width={o.crop.width}
                height={o.crop.height}
                style={{ left: o.crop.left, top: o.crop.top }}
              />
            </span>
          </label>
        );
      })}
    </div>
  );
}
