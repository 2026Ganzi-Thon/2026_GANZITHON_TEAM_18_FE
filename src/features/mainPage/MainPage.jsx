import { NavLink } from "react-router-dom";

import homeActiveIcon from "../../assets/homeActiveIcon.svg";
import messageIcon from "../../assets/messageIcon.svg";
import requestIcon from "../../assets/requestIcon.svg";
import speechIcon from "../../../public/assets/speechIcon.svg";
import { ROUTES } from "../../router/routes.constant";

import "./MainPage.css";

const quickMessages = [
  {
    title: "상담 톤",
    text: "지금 힘들어 보여서, 천천히 말해도 괜찮아.",
  },
  {
    title: "응원 톤",
    text: "네가 지금까지 해온 것만으로도 충분히 멋져.",
  },
  {
    title: "사과 톤",
    text: "미안한 마음이 커서 이렇게 표현해봤어.",
  },
];

const navItems = [
  { to: ROUTES.MAIN, label: "홈", icon: homeActiveIcon },
  { to: ROUTES.MESSAGE, label: "메시지", icon: messageIcon },
  { to: ROUTES.REQUEST, label: "요청", icon: requestIcon },
];

export default function MainPage() {
  return (
    <div className="page-shell main-page">
      <header className="top-bar">
        <div className="brand-wrap">
          <img src={speechIcon} alt="말사이 아이콘" className="brand-icon" />
          <span className="brand-name">말사이</span>
        </div>
        <button type="button" className="header-button" aria-label="새 메시지">
          +
        </button>
      </header>

      <section className="welcome-panel">
        <span className="panel-kicker">오늘의 추천 문장</span>
        <h1>
          꺼내기 어려운 말,
          <br />
          여기서 먼저
        </h1>
        <p>상대에게 힘이 되는 한 줄을 미리 준비해보세요.</p>
        <button type="button" className="primary-button">
          메시지 보내기
        </button>
      </section>

      <section className="prompt-section">
        <div className="section-header">
          <h2>빠른 문장 추천</h2>
          <span>3개</span>
        </div>

        <div className="prompt-list">
          {quickMessages.map((message) => (
            <article key={message.title} className="prompt-card">
              <span className="prompt-tag">{message.title}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="bottom-nav" aria-label="하단 네비게이션">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.MAIN}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src={item.icon} alt="" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
