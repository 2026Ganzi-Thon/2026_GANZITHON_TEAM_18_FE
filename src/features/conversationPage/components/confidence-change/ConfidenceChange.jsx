import happyEmoji from '../../assets/emoji/happy.png';
import neutralEmoji from '../../assets/emoji/mood/neutral.png';
import worryEmoji from '../../assets/emoji/mood/worry.png';
import chevronRight from '../../assets/icons/chevron-right.svg';
import { confidenceMessage } from '../../constants/emotionFeedback';
import './ConfidenceChange.css';

// '상승'은 Figma 디자인, 유지(무념무상)·하락(걱정)은 같은 이모지 세트로 프론트에서 정함. 밑 문장은 constants/emotionFeedback.js
const COPY = {
  up: { title: '자신감 상승!', emoji: happyEmoji },
  same: { title: '자신감 유지', emoji: neutralEmoji },
  down: { title: '자신감 하락', emoji: worryEmoji },
};

/** @param {{ before: number, after: number, moodAfter?: string|null, measured?: boolean }} props */
export default function ConfidenceChange({ before, after, moodAfter = null, measured = true }) {
  const trend = after > before ? 'up' : after < before ? 'down' : 'same';
  const copy = COPY[trend];
  return (
    <section className="confidence-change" aria-label="자신감 변화">
      <div className="confidence-change__top">
        <img className="confidence-change__emoji" src={copy.emoji} alt="" width="60" height="60" />
        <p className="confidence-change__title">{copy.title}</p>
        <p className="confidence-change__values" aria-label={`연습 전 ${before}점, 연습 후 ${after}점`}>
          <span>{before}</span>
          <img src={chevronRight} alt="" width="5.33001" height="10.33" />
          <span>{after}</span>
        </p>
      </div>
      <p className="confidence-change__message">{confidenceMessage(before, after, moodAfter, measured)}</p>
    </section>
  );
}
