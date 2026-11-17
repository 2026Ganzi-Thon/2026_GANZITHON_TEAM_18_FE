// 피드백 리포트 '내 감정 변화' 카드의 밑 문장 (프론트 고정 문구).
// 문구만 바꿀 때는 이 파일만 고치면 됩니다.
// Figma(확정본)에 있는 문구는 2개(자신감 상승 / 무념무상 → 분노)이고, 나머지는 프론트에서 정한 문구입니다.
import { MOOD } from './enums';

/** 자신감 변화가 '크다'고 보는 점수 차이 (0~10 척도) */
const BIG_CHANGE = 3;
/** 이 점수 이상이면 '높은 편', 이하이면 '낮은 편' */
const HIGH = 7;
const LOW = 3;

/** 자신감이 떨어졌거나 낮은 상태인지 (기분 카드가 '지금 답장하세요'라고 하지 않게) */
export function isConfidenceShaky(before, after) {
  return after < before || after <= LOW;
}

/** 부정적인 기분 (기분이 '나빠졌다/나아졌다'를 판단할 때 사용) */
const NEGATIVE = [MOOD.SADNESS, MOOD.ANGER, MOOD.WORRY];

/**
 * 자신감 카드 밑 문장: 오르내린 폭과 연습 후 점수로 고릅니다.
 * 연습 후 기분이 슬픔·화남·걱정이면 '지금 말해보세요' 대신 감정 정리를 먼저 권해서
 * 기분 카드(예: '답장은 잠깐 미뤄요')와 반대되는 말을 하지 않게 합니다.
 * @param {number} before 연습 전 자신감 (0~10)
 * @param {number} after  연습 후 자신감 (0~10)
 * @param {string|null} [moodAfter] 연습 후 기분 (MOOD)
 * @param {boolean} [measured] 연습 전·후 중 한 번이라도 슬라이더를 움직였는지
 */
export function confidenceMessage(before, after, moodAfter = null, measured = true) {
  const diff = after - before;

  // 연습 전·후 모두 슬라이더를 건드리지 않았으면(기본값 그대로) 변화를 말할 수 없음
  if (!measured) return '연습 전후에 자신감을 체크하면 변화를 볼 수 있어요.';

  if (NEGATIVE.includes(moodAfter)) {
    if (diff >= BIG_CHANGE) return '자신감은 크게 올랐어요. 감정이 정리되면 그때 말해보세요.';
    if (diff > 0) return '자신감은 올랐어요. 감정이 정리되면 그때 말해보세요.';
    if (diff === 0 && after >= HIGH) return '자신감은 충분해요. 감정이 정리되면 그때 말해보세요.';
  }

  if (diff >= BIG_CHANGE) return '자신감이 크게 올랐어요! 이 느낌 그대로 말해보세요.';
  if (diff > 0) {
    if (after >= HIGH) return '지금처럼 자신 있게 말해보세요.'; // Figma 문구
    return '조금씩 편해지고 있어요. 한 번 더 하면 더 자연스러울 거예요.';
  }

  if (diff === 0) {
    if (after >= HIGH) return '처음부터 자신 있었네요. 연습한 그대로 말하면 돼요.';
    if (after <= LOW) return '아직 부담이 크네요. 꼭 하고 싶은 말 한 문장만 먼저 정해 볼까요?';
    return '연습할수록 조금씩 편해질 거예요.';
  }

  if (diff <= -BIG_CHANGE) return '생각보다 어려웠죠? 힌트를 보면서 다시 연습해 봐요.';
  if (after <= LOW) return '부담이 조금 커졌네요. 짧고 분명한 문장부터 연습해 봐요.';
  return '조금 긴장했나 봐요. 한 번 더 연습하면 훨씬 편해질 거예요.';
}

/**
 * 기분 카드 밑 문장. 연습 후 기분마다 상황별 문장이 있습니다.
 * - first:  연습 전 기분을 고르지 않았을 때
 * - same:   연습 전과 같은 기분일 때
 * - better: 부정적인 기분(슬픔·화남·걱정)에서 바뀌었을 때
 * - worse:  기쁨·무념무상에서 바뀌었을 때
 * - other:  부정적인 기분끼리 바뀌었을 때 (예: 걱정 → 화남)
 */
const MOOD_MESSAGES = {
  [MOOD.JOY]: {
    first: '기분이 한결 가벼워졌어요. 이 느낌 그대로 답장해 보세요.',
    same: '좋은 기분이 이어지고 있어요. 지금 답장해도 괜찮아요.',
    better: '무거웠던 마음이 풀렸네요. 연습한 보람이 있어요!',
    worse: '기분이 한결 가벼워졌어요. 이 느낌 그대로 답장해 보세요.',
  },
  [MOOD.NEUTRAL]: {
    first: '지금이 답장하기 좋은 타이밍이에요.',
    same: '흔들리지 않고 차분했어요. 이대로 답장해도 좋아요.',
    better: '올라왔던 감정이 가라앉았어요. 지금 차분하게 답장해 보세요.',
    worse: '들뜬 마음이 가라앉았어요. 담백하게 답장해 보세요.',
  },
  [MOOD.SADNESS]: {
    first: '천천히 정리하고 답장해도 괜찮아요.',
    same: '아직 마음이 무거워요. 오늘은 쉬고 내일 답장해도 괜찮아요.',
    worse: '연습하면서 마음이 무거워졌네요. 거절해도 미안해할 필요는 없어요.',
    other: '감정이 조금 가라앉으면서 서운함이 남았네요. 천천히 정리해도 괜찮아요.',
  },
  [MOOD.ANGER]: {
    first: '화가 많이 올라왔네요. 답장은 잠깐 미뤄요.',
    same: '화가 아직 가라앉지 않았네요. 감정이 정리된 뒤에 답장해요.',
    worse: '화가 많이 올라왔네요. 답장은 잠깐 미뤄요.', // Figma 문구 (무념무상 → 분노)
    other: '걱정이나 서운함이 화로 바뀌었네요. 바로 답장하지 말고 한숨 돌려요.',
  },
  [MOOD.WORRY]: {
    first: '아직 걱정이 남아 있네요. 한 번 더 연습해 볼까요?',
    same: '걱정이 계속되네요. 걱정되는 부분을 힌트로 먼저 정리해 봐요.',
    worse: '연습하면서 걱정이 생겼네요. 한 번 더 연습하면 훨씬 편해질 거예요.',
    other: '감정이 조금 가라앉았지만 걱정이 남았네요. 한 번 더 연습해 볼까요?',
  },
};

/** 위 규칙으로는 어색한 조합에 쓰는 전용 문장 ('연습 전>연습 후') */
const PAIR_MESSAGES = {
  [`${MOOD.SADNESS}>${MOOD.WORRY}`]: '서운함이 걱정으로 바뀌었네요. 걱정되는 부분을 먼저 정리해 봐요.',
  [`${MOOD.WORRY}>${MOOD.SADNESS}`]: '걱정이 서운함으로 바뀌었네요. 천천히 정리하고 답장해도 괜찮아요.',
  [`${MOOD.ANGER}>${MOOD.JOY}`]: '올라왔던 화가 풀렸네요. 연습한 보람이 있어요!',
};

/**
 * 기분은 좋은데(기쁨·무념무상) 자신감이 떨어졌거나 낮을 때.
 * 자신감 카드가 '다시 연습해 봐요'라고 하므로 '지금 답장하세요'와 부딪히지 않게 바꿉니다.
 */
const SHAKY_MESSAGES = {
  [MOOD.JOY]: '기분은 좋아요. 자신감이 조금 더 붙으면 그때 답장해요.',
  [MOOD.NEUTRAL]: '마음은 차분해요. 한 번 더 연습하고 답장해 보세요.',
};

/**
 * @param {string|null} before 연습 전 기분 (MOOD, 안 골랐으면 null)
 * @param {string} after       연습 후 기분 (MOOD)
 * @param {{ confidenceShaky?: boolean }} [options] 자신감이 떨어졌거나 낮은지 (isConfidenceShaky)
 */
export function moodMessage(before, after, { confidenceShaky = false } = {}) {
  const m = MOOD_MESSAGES[after];
  if (!m) return '';
  if (confidenceShaky && SHAKY_MESSAGES[after]) return SHAKY_MESSAGES[after];
  const pair = PAIR_MESSAGES[`${before}>${after}`];
  if (pair) return pair;
  if (!before) return m.first;
  if (before === after) return m.same;
  const wasNegative = NEGATIVE.includes(before);
  if (!wasNegative) return m.worse;
  return m.better ?? m.other ?? m.first;
}
