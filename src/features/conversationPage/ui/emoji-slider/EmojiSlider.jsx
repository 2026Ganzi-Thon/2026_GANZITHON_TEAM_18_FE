import { useId } from 'react';
import { CONFIDENCE_MAX, CONFIDENCE_MIN } from '../../constants/limits';
import { cx } from '../../utils/cx';
import angryEmoji from '../../assets/emoji/angry.png';
import happyEmoji from '../../assets/emoji/happy.png';
import thumbIcon from '../../assets/icons/slider-thumb.svg';
import './EmojiSlider.css';

/**
 * 자신감 슬라이더 (부담돼요 ↔ 자신있어요).
 * @param {{ value: number, onChange: (v: number) => void, label?: string, card?: boolean }} props
 */
export default function EmojiSlider({ value, onChange, label = '자신감', card = true }) {
  const labelId = useId();
  const percent = ((value - CONFIDENCE_MIN) / (CONFIDENCE_MAX - CONFIDENCE_MIN)) * 100;
  return (
    <div className={cx('emoji-slider', card && 'emoji-slider--card')}>
      <p className="emoji-slider__label" id={labelId}>
        {label}
      </p>
      <div className="emoji-slider__track-area">
        <img className="emoji-slider__emoji emoji-slider__emoji--left" src={angryEmoji} alt="" width="28" height="28" />
        <img className="emoji-slider__emoji emoji-slider__emoji--right" src={happyEmoji} alt="" width="28" height="29" />
        <div className="emoji-slider__track">
          <div className="emoji-slider__fill" style={{ '--p': percent / 100 }} />
        </div>
        {/* 손잡이가 움직이는 구간: 양쪽 이모지를 가리지 않도록 이모지 안쪽까지만 */}
        <div className="emoji-slider__rail">
          <img
            className="emoji-slider__thumb"
            src={thumbIcon}
            alt=""
            width="52"
            height="52"
            style={{ left: `${percent}%` }}
          />
          <input
            className="emoji-slider__range"
            type="range"
            min={CONFIDENCE_MIN}
            max={CONFIDENCE_MAX}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-labelledby={labelId}
            aria-valuetext={`${value}점`}
          />
        </div>
        <span className="emoji-slider__caption emoji-slider__caption--left">부담돼요</span>
        <span className="emoji-slider__caption emoji-slider__caption--right">자신있어요</span>
      </div>
    </div>
  );
}
