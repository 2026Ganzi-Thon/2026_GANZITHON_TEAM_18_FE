import PageHeader from '../../ui/page-header/PageHeader';
import avatarIcon from '../../assets/icons/chat-avatar.svg';
import './ChatHeader.css';

/** 채팅 상단: 뒤로가기 + 아바타 + 'AI 대화 연습' + 상대 이름 · 관계 */
export default function ChatHeader({ partnerName, relation, onBack }) {
  return (
    <PageHeader onBack={onBack}>
      <div className="chat-header">
        <span className="chat-header__avatar" aria-hidden>
          <img src={avatarIcon} alt="" width="20" height="16" />
        </span>
        <div className="chat-header__text">
          <h1 className="chat-header__title">AI 대화 연습</h1>
          <p className="chat-header__sub">
            {partnerName}
            {relation && <span aria-hidden> · </span>}
            {relation}
          </p>
        </div>
      </div>
    </PageHeader>
  );
}
