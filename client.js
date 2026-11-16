import { ErrorCode } from '../constants/codes';

// Vite 기준: .env 에 VITE_API_BASE_URL 을 두면 덮어쓸 수 있습니다. 기본값은 문서의 Base URL.
// (CRA를 쓰면 process.env.REACT_APP_API_BASE_URL 로 바꿔 주세요.)
const BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? '/api/v1';

// 서버가 { error: { code, message } } 형태로 내려주는 에러를 감쌉니다.
export class ApiError extends Error {
  constructor({ status, code, message }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export async function request(method, path, { body, signal } = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    // 호출 취소(AbortController)는 그대로 던져서 호출한 쪽이 구분할 수 있게 합니다.
    if (error?.name === 'AbortError') throw error;
    throw new ApiError({
      status: 0,
      code: ErrorCode.NETWORK_ERROR,
      message: '네트워크 연결을 확인해 주세요.',
    });
  }

  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch {
    // 본문이 비었거나 JSON이 아닌 경우
  }

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      code: data?.error?.code ?? ErrorCode.UNKNOWN,
      message: data?.error?.message ?? '요청을 처리하지 못했어요.',
    });
  }

  return data;
}

export const post = (path, body, options) => request('POST', path, { ...options, body });
