import { NavLink, useLocation } from "react-router-dom";

import homeIcon from "../assets/homeIcon.svg";
import homeActiveIcon from "../assets/homeActiveIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import messageActiveIcon from "../assets/messageActiveIcon.svg";
import requestIcon from "../assets/requestIcon.svg";
import requestActiveIcon from "../assets/requestActiveIcon.svg";
import { ROUTES } from "../router/routes.constant";

import "./BottomNav.css";

const navItems = [
  {
    to: ROUTES.MAIN,
    label: "홈",
    defaultIcon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    to: ROUTES.REQUEST,
    label: "요청",
    defaultIcon: requestIcon,
    activeIcon: requestActiveIcon,
  },
  {
    to: ROUTES.CONVERSATION,
    label: "대화 연습",
    defaultIcon: messageIcon,
    activeIcon: messageActiveIcon,
  },
];

export default function BottomNav() {
  const location = useLocation();
  const activeRoute = [ROUTES.RESPONSE_SELECTION, ROUTES.MESSAGE].includes(location.pathname)
    ? ROUTES.REQUEST
    : location.pathname;

  return (
    <nav className="bottom-nav" aria-label="하단 네비게이션">
      {navItems.map(({ to, label, defaultIcon, activeIcon }) => {
        const isActive = activeRoute === to;

        return (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.MAIN}
            className={`bottom-nav__item ${isActive ? "is-active" : ""}`}
          >
            <img src={isActive ? activeIcon : defaultIcon} alt={label} />
          </NavLink>
        );
      })}
    </nav>
  );
}
