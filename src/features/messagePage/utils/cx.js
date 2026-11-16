/** className 합치기: 거짓 값은 빼고 공백으로 연결. cx('button', isFull && 'button--full') */
export function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}
