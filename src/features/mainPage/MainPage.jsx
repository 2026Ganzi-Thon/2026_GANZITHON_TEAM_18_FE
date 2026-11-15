import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import logoIcon from "../../../public/assets/logoIcon.svg";
import speechIcon from "../../../public/assets/speechIcon.svg";
import playIcon from "../../assets/play.svg";
import settingIcon from "../../assets/setting.svg";
import { ROUTES } from "../../router/routes.constant";

import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="page-shell main-page">
      <header className="main-header">
        <div className="brand-wrap">
          <img src={logoIcon} alt="" aria-hidden="true" className="brand-icon" />
          <span className="brand-name">말사이</span>
        </div>
        <button type="button" className="header-setting" aria-label="설정">
          <img src={settingIcon} alt="" aria-hidden="true" className="setting-icon" />
        </button>
      </header>

      <section className="practice-hero">
        <div className="hero-copy-wrap">
          <div className="hero-copy">
            <p>대화가</p>
            <p>조금 더 편안해져요</p>
          </div>
        </div>

        <button
          type="button"
          className="practice-button"
          onClick={() => navigate(ROUTES.CONVERSATION)}
        >
          <span className="practice-text">거절 연습하기</span>
          <span className="practice-icon" aria-hidden="true">
            <img src={playIcon} alt="" aria-hidden="true" />
          </span>
          <img src={speechIcon} alt="" aria-hidden="true" className="practice-speech-icon" />
        </button>
      </section>

      <BottomNav />
    </div>
  );
}
