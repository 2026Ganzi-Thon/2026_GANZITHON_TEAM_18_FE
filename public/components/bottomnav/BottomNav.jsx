import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav aria-label="bottom navigation" className="bottom-nav">
      <NavLink to="/main" className="bottom-nav__item">
        홈
      </NavLink>
      <NavLink to="/message" className="bottom-nav__item">
        메시지
      </NavLink>
      <NavLink to="/request" className="bottom-nav__item">
        요청
      </NavLink>
    </nav>
  );
}
