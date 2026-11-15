import { cx } from '../../utils/cx';
import './Button.css';

/**
 * @param {{ variant?: 'primary'|'outline', icon?: string, iconSize?: number,
 *           fullWidth?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  variant = 'primary',
  icon,
  iconSize = 20,
  fullWidth = variant === 'primary',
  className,
  children,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={cx('button', `button--${variant}`, fullWidth && 'button--full', className)}
      {...rest}
    >
      {icon && <img className="button__icon" src={icon} alt="" width={iconSize} height={iconSize} />}
      <span className="button__label">{children}</span>
    </button>
  );
}
