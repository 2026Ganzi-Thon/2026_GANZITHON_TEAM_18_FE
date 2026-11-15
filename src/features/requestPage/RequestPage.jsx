import { NavLink } from "react-router-dom";

import homeIcon from "../../assets/homeIcon.svg";
import messageIcon from "../../assets/messageIcon.svg";
import requestActiveIcon from "../../assets/requestActiveIcon.svg";
import { ROUTES } from "../../router/routes.constant";

import "./RequestPage.css";

const navItems = [
  { to: ROUTES.MAIN, label: "홈", icon: homeIcon },
  { to: ROUTES.MESSAGE, label: "메시지", icon: messageIcon },
  { to: ROUTES.REQUEST, label: "요청", icon: requestActiveIcon },
];

export default function RequestPage() {
  return (
    <div className="page-shell request-page">
      <header className="top-bar">
        <div className="brand-wrap">
          <span className="brand-name">요청서 작성</span>
        </div>
        <button type="button" className="header-button" aria-label="설정">
          ···
        </button>
      </header>

      <section className="request-panel">
        <div className="field-row">
          <label htmlFor="recipient">누구에게</label>
          <input id="recipient" type="text" value="지민" readOnly />
        </div>

        <div className="field-row">
          <label htmlFor="title">제목</label>
          <input id="title" type="text" placeholder="오늘의 마음을 적어보세요" />
        </div>

        <div className="field-row textarea-row">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="7"
            placeholder="오늘 내가 전하고 싶은 말을 적어보세요.&#10;예: 오늘은 조금 힘들었지만, 네가 항상 잘하고 있던 것처럼 느껴져서..."
          />
        </div>

        <button type="button" className="primary-button">
          보내기
        </button>
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
