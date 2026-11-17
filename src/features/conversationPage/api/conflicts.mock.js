import { RELATION_CATEGORY, RESPONSE_TYPE } from '../constants/enums';

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const relationCodes = {
  선배: RELATION_CATEGORY.SENIOR,
  동료: RELATION_CATEGORY.COLLEAGUE,
  '동료·팀원': RELATION_CATEGORY.COLLEAGUE,
  후배: RELATION_CATEGORY.JUNIOR,
  친구: RELATION_CATEGORY.FRIEND,
  연인: RELATION_CATEGORY.PARTNER,
  가족: RELATION_CATEGORY.FAMILY,
  기타: RELATION_CATEGORY.OTHER,
};

function readLine(text, label) {
  return text.match(new RegExp(`^${label}:\\s*(.*)$`, 'm'))?.[1]?.trim() || null;
}

export async function chatConflict(_profile, _mood, messages) {
  await wait();
  const latest = messages.filter((message) => message.sender === 'USER').at(-1)?.content || '';
  const counterpartName = readLine(latest, '상대 이름');
  const relationDetail = readLine(latest, '관계');
  const requestContent = readLine(latest, '부탁 내용');
  const deadlineText = readLine(latest, '마감일');
  const durationText = readLine(latest, '예상 소요 시간');
  const estimatedMinutes = { '30분': 30, '1시간': 60, '1시간 30분': 90, '2시간 이상': 120 }[durationText] ?? null;

  return {
    aiMessage: '부탁 내용을 정리했어요. 어떤 방식으로 대응할지 선택해 주세요.',
    summary: {
      counterpartName,
      relationCategory: relationCodes[relationDetail] || null,
      relationDetail,
      requestContent,
      deadlineText,
      deadlineAt: null,
      estimatedMinutes,
      psychologicalContext: null,
      relatedScheduleIds: [],
    },
    newSchedules: [],
    newRoles: [],
    suggestedTags: [],
    isInputComplete: Boolean(counterpartName && requestContent),
    recommendation: { responseType: RESPONSE_TYPE.CONDITIONAL, reason: '가능한 시간과 범위를 고려해 대응 방식을 골라보세요.' },
  };
}

export async function createMessageDraft({ summary, responseType, availableCondition }) {
  await wait(350);
  const name = summary.counterpartName || '상대방';
  const request = summary.requestContent || '부탁한 일';
  const due = summary.deadlineText ? ` ${summary.deadlineText}까지` : '';
  let draft;
  if (responseType === RESPONSE_TYPE.DECLINE) {
    draft = `${name}님, 부탁해 주셔서 고마워요. 다만 ${request}는 이번에는 어려울 것 같아요. 이해해 주시면 감사하겠습니다.`;
  } else if (responseType === RESPONSE_TYPE.CONDITIONAL) {
    draft = `${name}님, 부탁해 주셔서 고마워요. ${request}${due}은(는) ${availableCondition || '가능한 시간과 범위를 조정하면'} 도와드릴 수 있어요. 괜찮을까요?`;
  } else {
    draft = `${name}님, 부탁해 주셔서 고마워요. ${request}${due}까지 도와드릴게요.`;
  }
  return { draft, aiMessage: '요청하신 내용에 맞춰 초안을 만들었어요.' };
}
