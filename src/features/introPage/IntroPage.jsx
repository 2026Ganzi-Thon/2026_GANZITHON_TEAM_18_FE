import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoIcon from "../../../public/assets/intro-mark.svg";
import "./IntroPage.css";

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigationTimer = window.setTimeout(() => navigate("/main", { replace: true }), 3000);
    return () => {
      window.clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <main className="intro-screen" aria-label="말사이 시작 화면">
      <div className="intro-content">
        <img src={logoIcon} alt="말사이 심볼" className="intro-logo"/>
        <p className="intro-description">꺼내기 어려운 말, 여기서 먼저.</p>
      </div>
    </main>
  );
}
