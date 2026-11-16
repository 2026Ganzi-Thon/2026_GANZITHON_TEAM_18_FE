// localStorage 래퍼. 컴포넌트에서 localStorage를 직접 쓰지 않습니다.
// 접근이 막힌 환경(사생활 보호 모드 등)에서도 앱이 죽지 않도록 모두 try/catch.

const PREFIX = 'malsai:v1:';

export function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** 데이터구조설계 1장: profile / contacts / checkIns */
export const KEYS = {
  PROFILE: 'profile',
  CONTACTS: 'contacts',
  CHECK_INS: 'checkIns',
};
