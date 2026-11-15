import './LabeledRow.css';

/**
 * 왼쪽 아이콘+라벨, 오른쪽 입력칸 한 줄.
 * @param {{ icon: string, iconWidth: number, iconHeight: number, label: string,
 *           htmlFor: string, children: React.ReactNode }} props
 */
export default function LabeledRow({ icon, iconWidth, iconHeight, label, htmlFor, children }) {
  return (
    <div className="labeled-row">
      <label className="labeled-row__label" htmlFor={htmlFor}>
        <span className="labeled-row__icon-box">
          <img src={icon} alt="" width={iconWidth} height={iconHeight} />
        </span>
        {label}
      </label>
      {children}
    </div>
  );
}
