import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import logoIcon from "../../../public/assets/main-brand-icon.svg";
import speechIcon from "../../../public/assets/main-hero.png";
import settingIcon from "../../assets/setting.svg";
import { ROUTES } from "../../router/routes.constant";

import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="page-shell main-page">
      <header className="main-header">
        <div className="brand-wrap">
          <img src={logoIcon} alt="" aria-hidden="true" className="brand-icon" />
          <span className="brand-name">말사이</span>
        </div>
        <button type="button" className="header-setting" aria-label="설정" onClick={() => setSettingsOpen(true)}>
          <img src={settingIcon} alt="" aria-hidden="true" className="setting-icon" />
        </button>
      </header>

      <section className="practice-hero" aria-labelledby="practice-heading">
        <div className="hero-copy">
          <h1 id="practice-heading">대화가<br />조금 더 편안해져요</h1>
          <button
            type="button"
            className="practice-button"
            onClick={() => navigate(ROUTES.CONVERSATION)}
          >
            <span className="practice-play" aria-hidden="true">▶</span>
            <span>거절 연습하기</span>
          </button>
        </div>
        <img src={speechIcon} alt="말풍선 일러스트" className="practice-illustration" />
      </section>

      <button
        type="button"
        className="main-create-button"
        aria-label="요청 작성하기"
        onClick={() => navigate(ROUTES.REQUEST)}
      >
        <span aria-hidden="true">＋</span>
      </button>
      {settingsOpen && (
        <div className="settings-overlay" onClick={() => setSettingsOpen(false)}>
          <section className="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="settings-title">설정</h2>
            <p>설정 화면을 준비하고 있어요.</p>
            <button type="button" onClick={() => setSettingsOpen(false)}>닫기</button>
          </section>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
