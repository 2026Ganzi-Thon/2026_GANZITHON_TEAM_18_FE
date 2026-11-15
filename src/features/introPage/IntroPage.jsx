import "./IntroPage.css";
import logoIcon from "../../../public/assets/logoIcon.svg";
import logoText from "../../assets/logoText.svg";

export default function IntroPage() {
  return (
    <div className="intro-screen">
      <div className="status-icons">
        <img src={logoIcon} alt="말사이 로고 아이콘" className="intro-logo" />
        <img src={logoText} alt="말사이 로고" className="intro-logo-text" />
      </div>

      <main className="intro-content">
        <p className="intro-description">꺼내기 어려운 말, 여기서 먼저.</p>
      </main>

    </div>
  );
}