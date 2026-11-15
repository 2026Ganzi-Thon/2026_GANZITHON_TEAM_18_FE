// ⚠️ 임시값 — BE와 확정되면 이 파일만 고치면 됩니다.

/** 시뮬레이션 턴 상한 기본값. 실제 값은 /simulations/start 응답의 maxTurns를 우선 사용 */
export const DEFAULT_MAX_TURNS = 20;

/** 피드백 점수 척도 기본값. 실제 값은 리포트 응답의 scoreScale을 우선 사용 */
export const DEFAULT_SCORE_SCALE = 100;

/** 항목별 점수를 표시하는 칸 수 (DotGauge) */
export const GAUGE_STEPS = 5;

/** 자신감 슬라이더 범위 */
export const CONFIDENCE_MIN = 0;
export const CONFIDENCE_MAX = 10;
export const CONFIDENCE_DEFAULT = 5;
