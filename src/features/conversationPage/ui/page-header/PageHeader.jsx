import { useNavigate } from 'react-router-dom';
import { cx } from '../../utils/cx';
import backIcon from '../../assets/icons/back.svg';
import backWhiteIcon from '../../assets/icons/back-white.svg';
import './PageHeader.css';

/**
 * 뒤로가기 + 가운데 제목. children을 넘기면 제목 대신 렌더링합니다.
 * @param {{ title?: string, tone?: 'dark'|'light', onBack?: () => void, children?: React.ReactNode }} props
 */
export default function PageHeader({ title, tone = 'dark', onBack, children, showBack = true, rightAction, className = '' }) {
  const navigate = useNavigate();
  const light = tone === 'light';
  return (
    <header className={`page-header ${className}`.trim()}>
      {showBack && <button
        type="button"
        className="page-header__back"
        onClick={onBack || (() => navigate(-1))}
        aria-label="뒤로 가기"
      >
        <img src={light ? backWhiteIcon : backIcon} alt="" width="9.2" height="16.2" />
      </button>}
      {children || <h1 className={cx('page-header__title', light && 'page-header__title--light')}>{title}</h1>}
      {rightAction && <div className="page-header__action">{rightAction}</div>}
    </header>
  );
}
