import { useState } from 'react';
import Bulb from '../bulb/Bulb';
import hintBg from '../../assets/icons/hint-button-bg.svg';
import sendBg from '../../assets/icons/send-bg.svg';
import sendIcon from '../../assets/icons/send.svg';
import './ChatInput.css';

/**
 * @param {{ onSend: (text: string) => void, onHint: () => void,
 *           disabled?: boolean, hintDisabled?: boolean, placeholder?: string }} props
 */
export default function ChatInput({ onSend, onHint, disabled, hintDisabled, placeholder }) {
  const [text, setText] = useState('');
  const canSend = !disabled && text.trim().length > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={submit}>
      <div className="chat-input__field">
        <button
          type="button"
          className="chat-input__hint"
          onClick={onHint}
          disabled={hintDisabled || disabled}
          aria-label="힌트 보기"
        >
          <img className="chat-input__hint-bg" src={hintBg} alt="" width="36" height="36" />
          <Bulb size={24} />
        </button>
        <input
          className="chat-input__input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder || '메시지를 입력해 보세요...'}
          aria-label="메시지"
          disabled={disabled}
          maxLength={300}
        />
      </div>
      <button type="submit" className="chat-input__send" disabled={!canSend} aria-label="보내기">
        <img className="chat-input__send-bg" src={sendBg} alt="" width="42" height="42" />
        <img className="chat-input__send-icon" src={sendIcon} alt="" width="17.6536" height="16.4996" />
      </button>
    </form>
  );
}
