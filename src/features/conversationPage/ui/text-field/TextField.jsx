import { cx } from '../../utils/cx';
import './TextField.css';

/** @param {React.InputHTMLAttributes<HTMLInputElement> & { block?: boolean }} props */
export default function TextField({ className, block = false, ...rest }) {
  return (
    <input
      type="text"
      className={cx('text-field', block && 'text-field--block', className)}
      placeholder="입력하세요..."
      {...rest}
    />
  );
}
