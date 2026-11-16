import { GOAL_TAG, PERSONALITY_TAG } from './enums';
import logicalImg from '../assets/images/personality-logical.png';
import guiltTripImg from '../assets/images/personality-hint.png';
import coolImg from '../assets/images/personality-cool.png';

/**
 * 대화연습2 성격 선택지 (캐러셀 순서).
 * ⚠️ PersonalityTag는 5개(EMOTIONAL, PUSHY 포함)지만 디자인 이미지가 3개뿐이라 3개만 노출합니다.
 * ⚠️ 말투 예시는 '눈치 주기형'만 디자인 문구이고, 나머지는 임시 문구입니다.
 */
export const PERSONALITY_OPTIONS = [
  {
    value: PERSONALITY_TAG.LOGICAL,
    name: '논리형',
    description: '근거를 들어 설득해요',
    image: logicalImg,
    toneExample: '이번 자료는 네가 제일 잘 알잖아. 오늘 끝내야 다음 일정도 맞출 수 있어.',
  },
  {
    value: PERSONALITY_TAG.GUILT_TRIP,
    name: '눈치 주기형',
    description: '돌려서 은근히 압박해요',
    image: guiltTripImg,
    toneExample: '다들 바쁜 건 알겠는데... 나만 이렇게 힘든 건가 싶긴 하다.',
  },
  {
    value: PERSONALITY_TAG.COOL,
    name: '쿨한형',
    description: '가볍게 툭 던지듯 부탁해요',
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
