import { NavLink } from "react-router-dom";

import homeIcon from "../../assets/homeIcon.svg";
import messageActiveIcon from "../../assets/messageActiveIcon.svg";
import requestIcon from "../../assets/requestIcon.svg";
import { ROUTES } from "../../router/routes.constant";

import "./MessagePage.css";

const messages = [
  {
    name: "지민",
    time: "오후 3:20",
    preview: "오늘은 잠깐만 들려도 돼? 말이 필요한 것 같아.",
    unread: 2,
  },
  {
    name: "서윤",
    time: "오후 1:05",
    preview: "네가 괜찮아질 수 있게 같이 기다릴게.",
    unread: 0,
  },
  {
    name: "강우",
    time: "어제",
    preview: "이 자리를 만들어서 고마워. 언제든 말해줘.",
    unread: 1,
  },
];

const navItems = [
  { to: ROUTES.MAIN, label: "홈", icon: homeIcon },
  { to: ROUTES.MESSAGE, label: "메시지", icon: messageActiveIcon },
  { to: ROUTES.REQUEST, label: "요청", icon: requestIcon },
];

export default function MessagePage() {
  return (
    <div className="page-shell message-page">
      <header className="top-bar">
        <div className="brand-wrap">
          <span className="brand-name">메시지</span>
        </div>
        <button type="button" className="header-button" aria-label="새 메시지">
          +
        </button>
      </header>

      <section className="message-list">
        {messages.map((item) => (
          <article key={item.name} className="message-card">
            <div className="avatar">{item.name.slice(0, 1)}</div>
            <div className="message-content">
              <div className="message-meta">
                <strong>{item.name}</strong>
                <span>{item.time}</span>
              </div>
              <p>{item.preview}</p>
            </div>
            {item.unread > 0 && <span className="badge">{item.unread}</span>}
          </article>
        ))}
      </section>

      <nav className="bottom-nav" aria-label="하단 네비게이션">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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
