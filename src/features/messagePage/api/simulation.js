// AI 대화 시뮬레이션 API — TalkFile_API설계.md 3-2
// 4개 API 모두 같은 setup(SimulationSetup)을 보냄. 서버는 저장하지 않으므로 대화 내역 전체를 매번 보냄.
import { post, toRequestMessages, USE_MOCK } from './client';
import * as mock from './simulation.mock';

/**
 * AI 첫 메시지
 * @param {import('../models/simulation').SimulationSetup} setup
 * @returns {Promise<{ firstAiMessage: string, maxTurns: number }>}
 */
export function startSimulation(setup) {
  if (USE_MOCK) return mock.startSimulation(setup);
  return post('/simulations/start', { setup });
}

/**
 * 대화. messages의 마지막 항목이 이번 사용자 메시지
 * @returns {Promise<{ aiMessage: string, shouldEnd: boolean, endReason: 'AI'|'MAX_TURNS'|null }>}
 */
export function chat(setup, messages) {
  if (USE_MOCK) return mock.chat(setup, messages);
  return post('/simulations/chat', { setup, messages: toRequestMessages(messages) });
}

/** @returns {Promise<import('../models/simulation').Hint>} */
export function getHint(setup, messages) {
  if (USE_MOCK) return mock.getHint(setup, messages);
  return post('/simulations/hints', { setup, messages: toRequestMessages(messages) });
}

/**
 * @param {'USER'|'AI'|'MAX_TURNS'} endReason
 * @returns {Promise<import('../models/simulation').Report>}
 */
export function getReport(setup, messages, endReason) {
  if (USE_MOCK) return mock.getReport(setup, messages, endReason);
  return post('/simulations/report', { setup, messages: toRequestMessages(messages), endReason });
}
