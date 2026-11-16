import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoIcon from "../../../public/assets/intro-mark.svg";
import wordmark from "../../../public/assets/intro-wordmark.svg";
import StatusBar from "../../components/StatusBar";
import "./IntroPage.css";

export default function IntroPage() {
  const navigate = useNavigate();
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    const wordmarkTimer = window.setTimeout(() => setShowWordmark(true), 1500);
    const navigationTimer = window.setTimeout(() => navigate("/main", { replace: true }), 3000);
    return () => {
      window.clearTimeout(wordmarkTimer);
      window.clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <main className="intro-screen" aria-label="말사이 시작 화면">
      <StatusBar />
      <div className={`intro-content ${showWordmark ? "is-wordmark" : ""}`}>
        <img src={showWordmark ? wordmark : logoIcon} alt={showWordmark ? "말사이" : "말사이 심볼"} className={showWordmark ? "intro-wordmark" : "intro-logo"} />
        <p className="intro-description">꺼내기 어려운 말, 여기서 먼저.</p>
      </div>
    </main>
  );
}
