import { cx } from '../../utils/cx';
import chevronDown from '../../assets/icons/chevron-down.svg';
import './Select.css';

/**
 * 네이티브 select + 디자인의 화살표.
 * @param {{ options: {value: string, label: string}[], placeholder?: string } &
 *         React.SelectHTMLAttributes<HTMLSelectElement>} props
 */
export default function Select({ options, placeholder = '선택', value, className, ...rest }) {
  return (
    <div className={cx('select', className)}>
      <select className={cx('select__control', !value && 'select__control--empty')} value={value} {...rest}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="select__chevron" aria-hidden>
        <img src={chevronDown} alt="" width="5.5" height="9.5" />
      </span>
    </div>
  );
}
