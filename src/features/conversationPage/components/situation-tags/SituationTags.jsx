import { SITUATION_TAGS } from '../../constants/practice';
import { cx } from '../../utils/cx';
import chatTagIcon from '../../assets/icons/chat-tag.svg';
import checkSmallIcon from '../../assets/icons/check-small.svg';
import './SituationTags.css';

/**
 * 채팅 입력창 위 상황 태그. 누르면 태그 문장이 입력창에 들어갑니다.
 * @param {{ selectedKey: string|null, onSelect: (tag: typeof SITUATION_TAGS[number]) => void, disabled?: boolean }} props
 */
export default function SituationTags({ selectedKey, onSelect, disabled }) {
  return (
    <div className="situation-tags">
      <p className="situation-tags__guide">
        <img src={chatTagIcon} alt="" width="16" height="15" />
        상황 태그를 누르면 문장이 입력돼요
      </p>
      <div className="situation-tags__list">
        {SITUATION_TAGS.map((tag) => {
          const selected = tag.key === selectedKey;
          return (
            <button
              key={tag.key}
              type="button"
              className={cx('situation-tags__chip', selected && 'situation-tags__chip--selected')}
              aria-pressed={selected}
              disabled={disabled}
              onClick={() => onSelect(tag)}
            >
              {selected && <img src={checkSmallIcon} alt="" width="16" height="16" />}
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
