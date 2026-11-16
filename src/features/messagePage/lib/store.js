import { useRef, useSyncExternalStore } from 'react';

/**
 * zustand의 create / useShallow와 같은 사용법의 작은 store.
 * 팀 레포 package.json을 건드리지 않으려고 messagePage 안에 둡니다.
 *   const useStore = create((set, get) => ({ ... }));
 *   useStore((s) => s.value);  useStore.getState();  useStore.setState(patch)
 */
export function create(initializer) {
  let state;
  const listeners = new Set();

  const getState = () => state;
  const setState = (partial) => {
    const patch = typeof partial === 'function' ? partial(state) : partial;
    if (!patch || Object.is(patch, state)) return;
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = initializer(setState, getState);
  const initialState = state;

  function useStore(selector = (s) => s) {
    return useSyncExternalStore(subscribe, () => selector(state), () => selector(initialState));
  }
  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;
  useStore.getInitialState = () => initialState;
  return useStore;
}

function shallowEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => Object.prototype.hasOwnProperty.call(b, k) && Object.is(a[k], b[k]));
}

/** 객체를 반환하는 selector를 얕은 비교로 안정화 (무한 렌더링 방지) */
export function useShallow(selector) {
  const prev = useRef();
  return (state) => {
    const next = selector(state);
    if (shallowEqual(prev.current, next)) return prev.current;
    prev.current = next;
    return next;
  };
}
