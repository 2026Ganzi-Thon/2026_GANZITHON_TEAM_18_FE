// 팀 공통 하단 네비게이션 (src/components/BottomNav, 수정하지 않고 그대로 사용)
import BottomNav from '../../../../components/BottomNav';
import { cx } from '../../utils/cx';
import './Screen.css';

/**
 * 모바일 화면 한 장: 상단 헤더 / 스크롤 본문 / 하단 고정 영역(CTA + 탭바).
 * className·bodyClassName: 페이지 블록을 섞어(mix) 페이지별 스타일을 줄 때 사용
 */
export default function Screen({ header, footer, showTabBar = true, className, bodyClassName, children }) {
  return (
    <div className={cx('screen', className)}>
      {header}
      <main className={cx('screen__body', bodyClassName)}>{children}</main>
      {(footer || showTabBar) && (
        <div className={cx('screen__footer', !showTabBar && 'screen__footer--no-tab')}>
          {footer}
          {showTabBar && <BottomNav />}
        </div>
      )}
    </div>
  );
}
