import { KEYS, read, write } from './localStore';

/** 시뮬레이션 전·후 자신감·부담감 (PoC 확인용, 서버로 보내지 않음) */
export function listCheckIns() {
  return read(KEYS.CHECK_INS, []);
}

/**
 * 같은 simulationId + phase는 덮어씁니다.
 * @param {import('../models/simulation').CheckIn} checkIn
 */
export function saveCheckIn(checkIn) {
  const list = listCheckIns().filter(
    (c) => !(c.simulationId === checkIn.simulationId && c.phase === checkIn.phase),
  );
  write(KEYS.CHECK_INS, [...list, checkIn]);
}
