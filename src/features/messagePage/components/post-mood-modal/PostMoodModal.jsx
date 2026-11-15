import Modal from '../../ui/modal/Modal';
import EmojiSlider from '../../ui/emoji-slider/EmojiSlider';
import Button from '../../ui/button/Button';
import './PostMoodModal.css';

/**
 * 팝업2: 연습 후 기분.
 * @param {{ open: boolean, value: number, onChange: (v: number) => void,
 *           onSubmit: () => void, onClose?: () => void, submitting?: boolean, error?: string }} props
 */
export default function PostMoodModal({ open, value, onChange, onSubmit, onClose, submitting, error }) {
  return (
    <Modal
      open={open}
      onClose={submitting ? undefined : onClose}
      labelledBy="post-mood-modal-title"
      className="post-mood-modal"
    >
      <h2 id="post-mood-modal-title" className="post-mood-modal__title">
        연습 후 기분이 어떠신가요?
      </h2>
      <EmojiSlider value={value} onChange={onChange} card={false} />
      {error && (
        <p className="post-mood-modal__error" role="alert">
          {error}
        </p>
      )}
      <Button className="post-mood-modal__submit" onClick={onSubmit} disabled={submitting} fullWidth={false}>
        {submitting ? '결과를 만들고 있어요...' : '제출하고 결과보기'}
      </Button>
    </Modal>
  );
}
