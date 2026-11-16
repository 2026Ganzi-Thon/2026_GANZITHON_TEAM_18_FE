import { useEffect, useRef } from 'react';
import { cx } from '../../utils/cx';
import './Modal.css';

/**
 * 화면 위 dim + 가운데 카드.
 * @param {{ open: boolean, onClose?: () => void, labelledBy?: string, className?: string,
 *           children: React.ReactNode }} props
 *  className: 카드에 섞을(mix) 블록 이름 (예: post-mood-modal)
 */
export default function Modal({ open, onClose, labelledBy, className, children }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    cardRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div
        ref={cardRef}
        className={cx('modal__card', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
