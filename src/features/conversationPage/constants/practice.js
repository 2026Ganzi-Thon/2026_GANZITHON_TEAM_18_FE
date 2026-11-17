import { GOAL_TAG, MOOD, PERSONALITY_TAG, RELATION_CATEGORY } from './enums';
import logicalImg from '../assets/images/personality-logical.png';
import guiltTripImg from '../assets/images/personality-hint.png';
import coolImg from '../assets/images/personality-cool.png';
import emotionalImg from '../assets/images/personality-emotional.svg';
import pushyImg from '../assets/images/personality-pushy.svg';
import joyImg from '../assets/emoji/happy.png';
import angerImg from '../assets/emoji/angry.png';
import sadnessImg from '../assets/emoji/mood/sadness.png';
import worryImg from '../assets/emoji/mood/worry.png';
import neutralImg from '../assets/emoji/mood/neutral.png';
import joyGrayImg from '../assets/emoji/mood/joy-gray.png';
import sadnessGrayImg from '../assets/emoji/mood/sadness-gray.png';
import angerGrayImg from '../assets/emoji/mood/anger-gray.png';
import worryGrayImg from '../assets/emoji/mood/worry-gray.png';

/**
 * 대화연습2 성격 선택지 (캐러셀 순서). 단일 선택 (API 설계: PersonalityTag 단일 선택).
 * ⚠️ 감정 호소형·밀어붙이기형 이미지는 기존 3개 스타일에 맞춰 임의로 만든 SVG입니다 (디자인 확정 시 교체).
 * ⚠️ 말투 예시는 '눈치 주기형'만 디자인 문구이고, 나머지는 임시 문구입니다.
 */
export const PERSONALITY_OPTIONS = [
  {
    value: PERSONALITY_TAG.EMOTIONAL,
    name: '감정 호소형',
    description: '감정에 기대어 부탁해요',
    speechStyle: '감정을 앞세우는 말투',
    image: emotionalImg,
    toneExample: '나 요즘 진짜 너무 힘들어서 그래... 너 아니면 부탁할 사람이 없어.',
  },
  {
    value: PERSONALITY_TAG.PUSHY,
    name: '밀어붙이기형',
    description: '거절할 틈 없이 몰아붙여요',
    speechStyle: '거침없이 몰아붙이는 말투', // ⚠️ 임시 문구
    image: pushyImg,
    toneExample: '그냥 해줘. 오늘까지 꼭 필요하니까 안 된다는 말은 하지 말고.',
  },
  {
    value: PERSONALITY_TAG.LOGICAL,
    name: '논리형',
    description: '근거를 들어 설득해요',
    speechStyle: '차분하고 단호한 말투',
    image: logicalImg,
    toneExample: '이번 자료는 네가 제일 잘 알잖아. 오늘 끝내야 다음 일정도 맞출 수 있어.',
  },
  {
    value: PERSONALITY_TAG.GUILT_TRIP,
    name: '눈치 주기형',
    description: '돌려서 은근히 압박해요',
    speechStyle: '은근히 압박하는 말투',
    image: guiltTripImg,
    toneExample: '다들 바쁜 건 알겠는데... 나만 이렇게 힘든 건가 싶긴 하다.',
  },
  {
    value: PERSONALITY_TAG.COOL,
    name: '쿨한 편',
    description: '가볍게 툭 던지듯 부탁해요',
    speechStyle: '솔직하고 간결한 말투',
    image: coolImg,
    toneExample: '이거 오늘까지 좀 해줄 수 있지? 금방 할 거야~',
  },
];

/**
 * 대화연습3 목표 선택지 (디자인 문구).
 * ⚠️ GoalTag 초안(CLEAR_INTENT 등 4개)과 디자인 선택지가 1:1로 맞지 않아 임시로 연결했습니다.
 *    '일정 조정 요청하기'는 맞는 태그가 없어 null로 보냅니다.
 */
export const GOAL_OPTIONS = [
  { key: 'DECLINE_POLITELY', label: '부담 없이 정중하게 거절하기', goalTag: GOAL_TAG.CLEAR_INTENT },
  { key: 'ACCEPT_WITH_CONDITION', label: '조건 걸고 수정하기', goalTag: GOAL_TAG.STATE_LIMIT },
  { key: 'RESCHEDULE', label: '일정 조정 요청하기', goalTag: null },
];

/** '직접 입력'을 고른 상태의 키 (goalTag는 null) */
export const CUSTOM_GOAL_KEY = 'CUSTOM';

/**
 * 기분 체크 (기쁨/슬픔/화남/걱정/무념무상 중 1탭). API 설계 Mood enum과 같은 값.
 * image: 선택된 상태(컬러), grayImage: 선택 안 된 상태. crop: Figma에서 28px 칸 안 이미지 크기·위치. 무념무상은 디자인상 두 상태가 같은 이미지입니다.
 * 피드백 리포트 '내 감정 변화' 카드: changeName(전 > 후 표시 이름), title(기분이 바뀌었을 때 제목),
 * sameTitle(전·후 기분이 같을 때 제목).
 * 밑 문장은 상황별로 constants/emotionFeedback.js 에서 고릅니다.
 * ⚠️ 디자인 문구는 화남('분노 상승!')만 있고 나머지 제목은 임시입니다.
 */
export const MOOD_OPTIONS = [
  {
    value: MOOD.JOY,
    crop: { width: 30, height: 31, left: -1, top: -2 },
    label: '기쁨',
    changeName: '기쁨',
    title: '기쁨 상승!',
    sameTitle: '기쁨 유지',
    image: joyImg,
    grayImage: joyGrayImg,
  },
  {
    value: MOOD.SADNESS,
    crop: { width: 30, height: 30, left: -2, top: -2 },
    label: '슬픔',
    changeName: '슬픔',
    title: '마음이 무거워요',
    sameTitle: '아직 마음이 무거워요',
    image: sadnessImg,
    grayImage: sadnessGrayImg,
  },
  {
    value: MOOD.ANGER,
    crop: { width: 28, height: 28, left: 0, top: 0 },
    label: '화남',
    changeName: '분노',
    title: '분노 상승!',
    sameTitle: '아직 화가 나 있어요',
    image: angerImg,
    grayImage: angerGrayImg,
  },
  {
    value: MOOD.WORRY,
    crop: { width: 28, height: 28, left: -1, top: 0 },
    label: '걱정',
    changeName: '걱정',
    title: '걱정이 생겼어요',
    sameTitle: '걱정이 이어지고 있어요',
    image: worryImg,
    grayImage: worryGrayImg,
  },
  {
    value: MOOD.NEUTRAL,
    crop: { width: 28, height: 29, left: -1, top: 0 },
    label: '무념무상',
    changeName: '무념무상',
    title: '마음이 차분해졌어요',
    sameTitle: '차분함 유지',
    image: neutralImg,
    grayImage: neutralImg,
  },
];

export const findMood = (value) => MOOD_OPTIONS.find((o) => o.value === value) ?? null;

/**
 * 채팅 상황 태그: 누르면 입력창에 문장이 들어갑니다.
 * ⚠️ 태그 이름은 디자인 문구, 들어가는 문장은 임시입니다.
 */
export const SITUATION_TAGS = [
  { key: 'BUSY', label: '일정이 있어요', sentence: '그날은 이미 일정이 있어서 어려울 것 같아요.' },
  { key: 'PARTIAL', label: '일부만 가능해요', sentence: '전부는 어렵고, 일부는 도와드릴 수 있어요.' },
  { key: 'DECLINE', label: '거절하고 싶어요', sentence: '죄송하지만 이번에는 도와드리기 어려워요.' },
];

/**
 * 주변 인물 불러오기 필터 칩 (디자인: 전체/직장/친구/가족).
 * ⚠️ 관계 분류 7개를 칩 4개로 묶은 임시 기준: 직장 = 동료·선배/상사·후배. 연인·기타는 '전체'에서만 보입니다.
 */
export const RELATION_FILTERS = [
  { key: 'ALL', label: '전체', categories: null },
  {
    key: 'WORK',
    label: '직장',
    categories: [RELATION_CATEGORY.COLLEAGUE, RELATION_CATEGORY.SENIOR, RELATION_CATEGORY.JUNIOR],
  },
  { key: 'FRIEND', label: '친구', categories: [RELATION_CATEGORY.FRIEND] },
  { key: 'FAMILY', label: '가족', categories: [RELATION_CATEGORY.FAMILY] },
];
