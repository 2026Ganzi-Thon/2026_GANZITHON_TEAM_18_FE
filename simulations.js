import { post } from './client';

// 아래 모든 API는 같은 setup(SimulationSetup)을 보냅니다.
// setup.conflictContext 는 필수 (없으면 400 VALIDATION_ERROR). utils/simulationSetup.js 로 만들 수 있어요.

/**
 * POST /simulations/start — AI 첫 메시지 (3-2)
 * @returns {Promise<{firstAiMessage: string, maxTurns: number}>}
 */
export function startSimulation({ setup, signal }) {
  return post('/simulations/start', { setup }, { signal });
}

/**
 * POST /simulations/chat — 시뮬레이션 대화 (3-3)
 * messages 는 지금까지의 전체 대화(AI 첫 메시지 포함), 마지막이 이번 사용자 메시지.
 * shouldEnd 가 true 면 마지막 aiMessage 를 보여준 뒤 requestReport 를 호출하세요.
 *
 * @returns {Promise<{aiMessage: string, shouldEnd: boolean, endReason: 'AI'|'MAX_TURNS'|null}>}
 */
export function sendSimulationMessage({ setup, messages, signal }) {
  return post('/simulations/chat', { setup, messages }, { signal });
}

/**
 * POST /simulations/hints — 힌트 (3-3)
 * 요청 형식은 chat 과 동일하며, 마지막 메시지는 AI 메시지여야 합니다.
 *
 * @returns {Promise<{direction: string, keywords: string[]}>}
 */
export function requestHint({ setup, messages, signal }) {
  return post('/simulations/hints', { setup, messages }, { signal });
}

/**
 * POST /simulations/report — 피드백 리포트 (3-3 → 3-4)
 * 사용자가 종료 버튼을 누르면 endReason 'USER', AI 판단이면 'AI', 턴 상한이면 'MAX_TURNS'.
 * 서버에 남지 않으므로 리포트 화면을 벗어나기 전까지 FE가 들고 있어야 합니다.
 *
 * @returns {Promise<{totalScore: number, scoreScale: number, summary: string, items: object[], sentenceComparisons: object[]}>}
 */
export function requestReport({ setup, messages, endReason, signal }) {
  return post('/simulations/report', { setup, messages, endReason }, { signal });
}
