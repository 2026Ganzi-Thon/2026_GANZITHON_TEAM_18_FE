import { findMood } from '../../constants/practice';
import { moodMessage } from '../../constants/emotionFeedback';
import chevronRight from '../../assets/icons/chevron-right.svg';
import '../confidence-change/ConfidenceChange.css';

/**
 * 연습 전 → 후 기분 변화 카드 (Figma 110:2932). 자신감 카드와 같은 모양.
 * 연습 후 기분을 고르지 않았으면 그리지 않습니다.
 * @param {{ before: string|null, after: string|null, confidenceShaky?: boolean }} props  MOOD 값
 */
export default function MoodChange({ before, after, confidenceShaky = false }) {
  const to = findMood(after);
  if (!to) return null;
  const from = findMood(before);
  const title = from?.value === to.value ? to.sameTitle : to.title;
  return (
    <section className="confidence-change" aria-label="기분 변화">
      <div className="confidence-change__top">
        <img className="confidence-change__emoji" src={to.image} alt="" width="60" height="60" />
        <p className="confidence-change__title">{title}</p>
        <p className="confidence-change__values">
          <span>{from ? from.changeName : '선택 안 함'}</span>
          <img src={chevronRight} alt="" width="5.33001" height="10.33" />
          <span>{to.changeName}</span>
        </p>
      </div>
      <p className="confidence-change__message">{moodMessage(from?.value ?? null, to.value, { confidenceShaky })}</p>
    </section>
  );
}
