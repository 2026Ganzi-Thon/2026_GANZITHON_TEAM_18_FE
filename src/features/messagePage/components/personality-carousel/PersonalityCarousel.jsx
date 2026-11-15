import { useRef } from 'react';
import { cx } from '../../utils/cx';
import './PersonalityCarousel.css';

const ITEM_SPACING = 178; // Figma: 카드 중심 간격
const SWIPE_THRESHOLD = 40;

/**
 * 가운데 카드가 선택된 상태인 가로 캐러셀. 스와이프, 양옆 카드 탭, ←/→ 키로 이동.
 * @param {{ options: typeof import('../../constants/practice').PERSONALITY_OPTIONS,
 *           index: number, onChange: (i: number) => void }} props
 */
export default function PersonalityCarousel({ options, index, onChange }) {
  const startX = useRef(null);
  const last = options.length - 1;
  const go = (i) => onChange(Math.max(0, Math.min(last, i)));

  return (
    <div className="personality-carousel">
      <div
        className="personality-carousel__track"
        role="listbox"
        aria-label="상대방 성격"
        aria-activedescendant={`personality-${options[index].value}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(index - 1);
          if (e.key === 'ArrowRight') go(index + 1);
        }}
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current == null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (dx <= -SWIPE_THRESHOLD) go(index + 1);
          else if (dx >= SWIPE_THRESHOLD) go(index - 1);
        }}
      >
        {options.map((o, i) => {
          const offset = i - index;
          const active = offset === 0;
          return (
            <div
              key={o.value}
              id={`personality-${o.value}`}
              role="option"
              aria-selected={active}
              className={cx('personality-carousel__item', active && 'personality-carousel__item--active')}
              style={{ '--offset': `${offset * ITEM_SPACING}px` }}
              onClick={() => !active && go(i)}
            >
              <img
                className="personality-carousel__image"
                src={o.image}
                alt=""
                width="148"
                height="147"
                draggable="false"
              />
              <div className="personality-carousel__text">
                <p className="personality-carousel__name">{o.name}</p>
                <p className="personality-carousel__description">{o.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="personality-carousel__pager" aria-hidden>
        {options.map((o, i) => (
          <span
            key={o.value}
            className={cx('personality-carousel__dot', i === index && 'personality-carousel__dot--active')}
          />
        ))}
      </div>
    </div>
  );
}
