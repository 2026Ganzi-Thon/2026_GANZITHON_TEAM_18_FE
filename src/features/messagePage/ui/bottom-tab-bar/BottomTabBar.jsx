import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';
import homeIcon from '../../assets/icons/tab-home.svg';
import practiceIcon from '../../assets/icons/tab-practice.svg';
import './BottomTabBar.css';

/**
 * 하단 탭바 (Figma: 홈 / 충돌 / 연습). 메시지 탭(연습) 화면에서만 쓰므로 '연습'이 활성 상태입니다.
 * 팀 라우트 기준: 홈 → /main, 충돌 → /request, 연습 → /message
 */
export default function BottomTabBar() {
  return (
    <nav className="bottom-tab-bar" aria-label="주요 메뉴">
      <NavLink to={ROUTES.MAIN} className="bottom-tab-bar__tab" aria-label="홈">
        <span className="bottom-tab-bar__icon-box">
          <img
            className="bottom-tab-bar__icon bottom-tab-bar__icon--home"
            src={homeIcon}
            alt=""
            width="17.5"
            height="18.2388"
          />
        </span>
      </NavLink>
      <NavLink to={ROUTES.REQUEST} className="bottom-tab-bar__tab" aria-label="충돌">
        <span className="bottom-tab-bar__icon-box" aria-hidden>
          <span className="bottom-tab-bar__square bottom-tab-bar__square--back" />
          <span className="bottom-tab-bar__square bottom-tab-bar__square--front" />
        </span>
      </NavLink>
      <NavLink to={ROUTES.MESSAGE} className="bottom-tab-bar__tab" aria-label="연습" aria-current="page">
        <span className="bottom-tab-bar__icon-box">
          <img
            className="bottom-tab-bar__icon bottom-tab-bar__icon--practice"
            src={practiceIcon}
            alt=""
            width="19"
            height="18.001"
          />
        </span>
      </NavLink>
    </nav>
  );
}
