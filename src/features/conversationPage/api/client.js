// 공통 규칙: Base URL /api/v1, JSON(camelCase), 에러는 { error: { code, message } }
const HOST = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_PREFIX = '/api/v1';

/** BE 주소가 없거나 VITE_USE_MOCK=true면 mock 응답을 씁니다. */
export const USE_MOCK = !HOST || import.meta.env.VITE_USE_MOCK === 'true';

const FALLBACK_MESSAGE = {
  VALIDATION_ERROR: '입력값을 다시 확인해 주세요.',
  AI_ERROR: 'AI 응답을 받지 못했어요. 다시 시도해 주세요.',
  AI_TIMEOUT: 'AI 응답이 늦어지고 있어요. 다시 시도해 주세요.',
};

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function post(path, body) {
  let res;
  try {
    res = await fetch(`${HOST}${API_PREFIX}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('네트워크 연결을 확인해 주세요.', 0, 'NETWORK');
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const code = data?.error?.code;
    // BE 메시지는 개발자용일 수 있어 사용자 문구는 코드 기준으로 보여줌
    throw new ApiError(FALLBACK_MESSAGE[code] || '잠시 후 다시 시도해 주세요.', res.status, code);
  }
  return data;
}

/** 화면 전용 필드(id, createdAt)를 빼고 { sender, content }만 보냄 */
export function toRequestMessages(messages) {
  return messages.map(({ sender, content }) => ({ sender, content }));
}
