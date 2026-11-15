import { useEffect, useRef } from 'react';
import { relationText } from '../../constants/labels';
import './PeopleListSheet.css';

/**
 * 저장된 주변 인물 목록 (하단 시트). ⚠️ 디자인 없음 — 토큰만 맞춘 기본 형태입니다.
 * @param {{ open: boolean, contacts: import('../../models/simulation').Contact[],
 *           onSelect: (c: import('../../models/simulation').Contact) => void, onClose: () => void }} props
 */
export default function PeopleListSheet({ open, contacts, onSelect, onClose }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    sheetRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="people-list-sheet" onClick={onClose}>
      <div
        ref={sheetRef}
        className="people-list-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="people-list-sheet-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="people-list-sheet-title" className="people-list-sheet__title">
          주변 인물 리스트
        </h2>
        {contacts.length === 0 ? (
          <p className="people-list-sheet__empty">
            저장된 인물이 없어요.
            <br />
            &lsquo;리스트에 추가&rsquo;로 먼저 저장해 주세요.
          </p>
        ) : (
          <ul className="people-list-sheet__list">
            {contacts.map((c) => (
              <li key={c.id}>
                <button type="button" className="people-list-sheet__item" onClick={() => onSelect(c)}>
                  <span className="people-list-sheet__name">{c.name}</span>
                  <span className="people-list-sheet__relation">{relationText(c)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
