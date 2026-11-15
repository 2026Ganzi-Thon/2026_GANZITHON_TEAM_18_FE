import BottomNav from "../../components/BottomNav";
import logoIcon from "../../../public/assets/logoIcon.svg";
import logoText from "../../assets/logoText.svg";

import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="page-shell main-page">
      <header className="page-header">
        <div className="brand-wrap">
          <img src={logoIcon} alt="말사이 로고 아이콘" className="intro-logo" />
          <img src={logoText} alt="말사이 로고" className="intro-logo-text" />
        </div>
      </header>


      <BottomNav />
    </div>
  );
}
