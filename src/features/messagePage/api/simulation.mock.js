// BE 연결 전 화면 확인용 mock (응답 형태는 API 설계 문서와 동일).
// VITE_API_BASE_URL을 넣으면 사용되지 않습니다.
import { CRITERION, END_REASON, GOAL_TAG, SENDER } from '../constants/enums';
import { DEFAULT_MAX_TURNS, DEFAULT_SCORE_SCALE } from '../constants/limits';

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

const FOLLOW_UPS = [
  '조금만 더 빨리 해주면 안 될까?',
  '다른 사람들도 다 바빠서 너밖에 없어...',
  '그럼 어디까지는 해줄 수 있어?',
];
const CLOSING = '알겠어, 그럼 그렇게 부탁할게. 고마워!';

export async function startSimulation() {
  await delay();
  return { firstAiMessage: '이번 행사 자료, 오늘까지 도와줄 수 있어?', maxTurns: DEFAULT_MAX_TURNS };
}

export async function chat(_setup, messages) {
  await delay();
  const userTurns = messages.filter((m) => m.sender === SENDER.USER).length;
  if (userTurns >= DEFAULT_MAX_TURNS) {
    return { aiMessage: CLOSING, shouldEnd: true, endReason: END_REASON.MAX_TURNS };
  }
  // mock: 사용자 메시지 4번째에 AI가 대화 마무리로 판단
  if (userTurns >= 4) return { aiMessage: CLOSING, shouldEnd: true, endReason: END_REASON.AI };
  return { aiMessage: FOLLOW_UPS[(userTurns - 1) % FOLLOW_UPS.length], shouldEnd: false, endReason: null };
}

export async function getHint() {
  await delay(400);
  return {
    direction: '가능한 범위를 먼저 말해보세요.',
    keywords: ['내 일정', '가능 일시', '도와줄 수 있는 범위'],
  };
}

export async function getReport(setup, messages) {
  await delay(900);
  const firstMine = messages.find((m) => m.sender === SENDER.USER);
  const items = [
    { criterion: CRITERION.CLARITY, score: 60, comment: '거절 의사가 분명하게 전달됐어요.' },
    { criterion: CRITERION.HABIT, score: 80, comment: '불필요한 사과 없이 적절한 톤이었어요.' },
  ];
  // ALTERNATIVE는 조건부 수락 목표일 때만 포함
  if (setup.goalTag === GOAL_TAG.STATE_LIMIT) {
    items.splice(1, 0, {
      criterion: CRITERION.ALTERNATIVE,
      score: 40,
      comment: '다른 가능한 일정이나 대안을 더 구체적으로 말해보세요.',
    });
  }
  return {
    totalScore: 82,
    scoreScale: DEFAULT_SCORE_SCALE,
    summary: '거절 의사는 분명했어요. 대안을 조금 더 구체적으로 말하면 좋아요.',
    items,
    sentenceComparisons: [
      {
        original: firstMine?.content || '목요일엔 기획 회의가 있어서 어려울 것 같아요.',
        improved: '목요일에는 기획 회의가 있어요. 금요일 오후까지 포스터를 만들어 드려도 될까요?',
      },
    ],
  };
}
