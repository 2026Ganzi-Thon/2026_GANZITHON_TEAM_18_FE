import { KEYS, read, write } from './localStore';

const EMPTY = { name: null, schedules: [], roles: [] };

/** @returns {{ name: string|null, schedules: object[], roles: object[] }} */
export function getProfile() {
  return { ...EMPTY, ...read(KEYS.PROFILE, EMPTY) };
}

/** 내 이름 저장 — 다음 연습 때 기본값으로 채움 */
export function saveProfileName(name) {
  write(KEYS.PROFILE, { ...getProfile(), name });
}
