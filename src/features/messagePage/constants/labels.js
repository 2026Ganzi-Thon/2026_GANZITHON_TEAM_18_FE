import { CRITERION, RELATION_CATEGORY } from './enums';

export const RELATION_LABEL = {
  [RELATION_CATEGORY.COLLEAGUE]: '동료·팀원',
  [RELATION_CATEGORY.SENIOR]: '선배·상사',
  [RELATION_CATEGORY.JUNIOR]: '후배',
  [RELATION_CATEGORY.FRIEND]: '친구',
  [RELATION_CATEGORY.PARTNER]: '연인',
  [RELATION_CATEGORY.FAMILY]: '가족',
  [RELATION_CATEGORY.OTHER]: '기타',
};

/** 평가 항목 라벨. '명확도'·'대안 제시'는 디자인 문구, 나머지는 API 설계 문구 */
export const CRITERION_LABEL = {
  [CRITERION.CLARITY]: '명확도',
  [CRITERION.LIMIT_CONDITION]: '범위·조건 전달',
  [CRITERION.CONSISTENCY]: '의사 유지',
  [CRITERION.RESPECT]: '관계 존중',
  [CRITERION.HABIT]: '표현 습관',
  [CRITERION.ALTERNATIVE]: '대안 제시',
};

/** 관계 표시 문구: 설명(예: 동아리 선배)이 있으면 설명, 없으면 분류 이름 */
export function relationText({ relationCategory, relationDetail } = {}) {
  return relationDetail || RELATION_LABEL[relationCategory] || '';
}
