import happyEmoji from '../../assets/emoji/happy.png';
import angryEmoji from '../../assets/emoji/angry.png';
import chevronRight from '../../assets/icons/chevron-right.svg';
import './ConfidenceChange.css';

// ⚠️ '상승'만 디자인에 있고, 유지·하락 문구와 이모지는 임시입니다.
const COPY = {
  up: { title: '자신감 상승!', message: '지금처럼 자신 있게 말해보세요.', emoji: happyEmoji },
  same: { title: '자신감 유지', message: '연습할수록 조금씩 편해질 거예요.', emoji: happyEmoji },
  down: { title: '조금 긴장했나 봐요', message: '한 번 더 연습하면 훨씬 편해질 거예요.', emoji: angryEmoji },
};

export default function ConfidenceChange({ before, after }) {
  const trend = after > before ? 'up' : after < before ? 'down' : 'same';
  const copy = COPY[trend];
  return (
    <section className="confidence-change" aria-label="자신감 변화">
      <div className="confidence-change__top">
        <img className="confidence-change__emoji" src={copy.emoji} alt="" width="58" height="60" />
        <p className="confidence-change__title">{copy.title}</p>
        <p className="confidence-change__values" aria-label={`연습 전 ${before}점, 연습 후 ${after}점`}>
          <span>{before}</span>
          <img src={chevronRight} alt="" width="5.33001" height="10.33" />
          <span>{after}</span>
        </p>
      </div>
      <p className="confidence-change__message">{copy.message}</p>
    </section>
  );
}
