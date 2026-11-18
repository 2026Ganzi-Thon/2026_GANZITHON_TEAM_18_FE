import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import { usePracticeStore } from '../../practiceStore';
import { listContacts } from '../../storage/contacts';
import { PERSONALITY_OPTIONS, RELATION_FILTERS } from '../../constants/practice';
import { RELATION_LABEL, relationText } from '../../constants/labels';
import { ROUTES } from '../../routes';
import { cx } from '../../utils/cx';
import searchIcon from '../../assets/icons/search.svg';
import radioOn from '../../assets/icons/radio-on.svg';
import radioOff from '../../assets/icons/radio-off.svg';
import './PeoplePage.css';

/** 성격 · 말투 한 줄 (저장된 말투가 없으면 성격 유형의 기본 말투) */
function personalityText(contact) {
  const option = PERSONALITY_OPTIONS.find((o) => o.value === contact.personalityTag);
  if (!option) return '성격 미정';
  return `${option.name} · ${contact.speechStyle || option.speechStyle}`;
}

function matches(contact, query) {
  if (!query) return true;
  const haystack = [contact.name, relationText(contact), RELATION_LABEL[contact.relationCategory]].join(' ');
  return haystack.toLowerCase().includes(query.toLowerCase());
}

/** 대화연습2: 주변 인물 불러오기 (저장된 인물 검색·필터 후 하나 골라 상대 설정에 채움) */
export default function PeoplePage() {
  const navigate = useNavigate();
  const currentId = usePracticeStore((s) => s.contact.id);
  const { setContact } = usePracticeStore.getState();

  const [contacts] = useState(listContacts);
  const [query, setQuery] = useState('');
  const [filterKey, setFilterKey] = useState(RELATION_FILTERS[0].key);
  const [selectedId, setSelectedId] = useState(() =>
    contacts.some((c) => c.id === currentId) ? currentId : null,
  );

  const visible = useMemo(() => {
    const { categories } = RELATION_FILTERS.find((f) => f.key === filterKey);
    return contacts.filter(
      (c) => (!categories || categories.includes(c.relationCategory)) && matches(c, query.trim()),
    );
  }, [contacts, filterKey, query]);

  const selected = contacts.find((c) => c.id === selectedId);

  const load = () => {
    setContact(selected);
    navigate(ROUTES.PRACTICE_PARTNER);
  };

  return (
    <Screen
      className="people-page"
      header={<PageHeader title="주변 인물 불러오기" onBack={() => navigate(ROUTES.PRACTICE_PARTNER)} />}
      footer={
        <Button disabled={!selected} onClick={load}>
          선택한 인물 불러오기
        </Button>
      }
    >
      <h2 className="people-page__heading">누구와 대화를 연습할까요?</h2>

      <div className="people-page__filters">
        <label className="people-page__search">
          <img src={searchIcon} alt="" width="18" height="18" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름 또는 관계 검색"
            aria-label="이름 또는 관계 검색"
            maxLength={20}
          />
        </label>
        <div className="people-page__chips" role="group" aria-label="관계 필터">
          {RELATION_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={cx('people-page__chip', f.key === filterKey && 'people-page__chip--active')}
              aria-pressed={f.key === filterKey}
              onClick={() => setFilterKey(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <section className="people-page__list-section" aria-labelledby="people-page-list-title">
        <div className="people-page__list-head">
          <h3 id="people-page-list-title" className="people-page__list-title">
            주변 인물
          </h3>
          <span className="people-page__count">{visible.length}명</span>
        </div>

        {visible.length === 0 ? (
          <p className="people-page__empty">
            {contacts.length === 0 ? (
              <>
                저장된 인물이 없어요.
                <br />
                상대 설정에서 &lsquo;리스트에 추가&rsquo;로 먼저 저장해 주세요.
              </>
            ) : (
              '찾는 인물이 없어요.'
            )}
          </p>
        ) : (
          <ul className="people-page__list" role="radiogroup" aria-labelledby="people-page-list-title">
            {visible.map((c) => {
              const checked = c.id === selectedId;
              return (
                <li key={c.id}>
                  <label className={cx('people-page__card', checked && 'people-page__card--checked')}>
                    <input
                      className="people-page__radio-input"
                      type="radio"
                      name="people"
                      value={c.id}
                      checked={checked}
                      onChange={() => setSelectedId(c.id)}
                    />
                    <img src={checked ? radioOn : radioOff} alt="" width="22" height="22" />
                    <span className="people-page__info">
                      <span className="people-page__name-row">
                        <span className="people-page__name">{c.name}</span>
                        <span className="people-page__tag">{relationText(c)}</span>
                      </span>
                      <span className="people-page__desc">{personalityText(c)}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </Screen>
  );
}
