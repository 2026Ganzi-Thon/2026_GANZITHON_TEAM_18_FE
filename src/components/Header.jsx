import { useNavigate } from "react-router-dom";

import backIcon from "../assets/back.svg";

import "./Header.css";

export default function Header({
  title,
  subtitle,
  showBack = true,
  backTo,
  onBack,
  className = "",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (backTo) {
      navigate(backTo);
      return;
    }

    navigate(-1);
  };

  return (
    <header className={`page-header-wrap ${className}`.trim()}>
      {showBack && (
        <button
          type="button"
          className="header-back-button"
          aria-label="뒤로가기"
          onClick={handleBack}
        >
          <img src={backIcon} alt="뒤로가기" />
        </button>
      )}

      <div className="header-text-group">
        <h1>{title}</h1>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </header>
  );
}
