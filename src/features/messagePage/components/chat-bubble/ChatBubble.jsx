import { SENDER } from '../../constants/enums';
import { cx } from '../../utils/cx';
import './ChatBubble.css';

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
}

/**
 * @param {{ sender: 'USER'|'AI', content: React.ReactNode, createdAt?: string, wide?: boolean }} props
 *  wide: 말투 예시처럼 가로 전체를 쓰는 말풍선
 */
export default function ChatBubble({ sender, content, createdAt, wide = false }) {
  const mine = sender === SENDER.USER;
  const time = formatTime(createdAt);
  return (
    <div className={cx('chat-bubble', mine && 'chat-bubble--mine')}>
      <div
        className={cx(
          'chat-bubble__body',
          mine ? 'chat-bubble__body--me' : 'chat-bubble__body--ai',
          wide && 'chat-bubble__body--wide',
        )}
      >
        {content}
      </div>
      {time && (
        <time className="chat-bubble__time" dateTime={createdAt}>
          {time}
        </time>
      )}
    </div>
  );
}
