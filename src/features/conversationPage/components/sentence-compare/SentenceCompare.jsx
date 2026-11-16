import arrowIcon from '../../assets/icons/arrow.svg';
import sparkleIcon from '../../assets/icons/sparkle.svg';
import './SentenceCompare.css';

/** @param {{ comparison: { original: string, improved: string } }} props */
export default function SentenceCompare({ comparison }) {
  return (
    <section className="sentence-compare" aria-label="문장 비교">
      <div className="sentence-compare__group">
        <h2 className="sentence-compare__label sentence-compare__label--mine">내가 쓴 문장</h2>
        <p className="sentence-compare__box sentence-compare__box--original">{comparison.original}</p>
      </div>
      <span className="sentence-compare__arrow" aria-hidden>
        <img src={arrowIcon} alt="" width="20" height="16" />
      </span>
      <div className="sentence-compare__group">
        <h2 className="sentence-compare__label">
          <img src={sparkleIcon} alt="" width="24" height="24" />
          개선 문장
        </h2>
        <p className="sentence-compare__box sentence-compare__box--improved">{comparison.improved}</p>
      </div>
    </section>
  );
}
