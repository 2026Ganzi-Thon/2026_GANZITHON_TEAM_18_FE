import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import checkIcon from "../../assets/check.svg";
import chattingIcon from "../../assets/chatting.svg";
import copyIcon from "../../assets/copy.svg";
import shareIcon from "../../assets/share.svg";

import "./MessagePage.css";

const draftMessage = `안녕하세요. 최근 일정이 갑자기 바뀌어 연락드립니다.
이번 주 회의 일정이 조금 늦어질 가능성이 있어,
미리 양해 부탁드립니다. 가능한 빠르게 다시 안내드릴게요.`;

export default function MessagePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(draftMessage);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch (error) {
      console.error("복사 실패", error);
      setCopied(false);
    }
  };

  const handleShare = async () => {
    const shareText = message;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch (error) {
        console.error("공유 취소", error);
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
    } catch (error) {
      console.error("공유용 복사 실패", error);
    }
  };

  return (
    <div className="page-shell message-draft-page">
      <Header title="메시지 초안" onBack={() => navigate(-1)} />

      <section className="draft-card">
        <div className="draft-header-row">
          <div className="draft-label-wrap">
            <img src={chattingIcon} alt="" aria-hidden="true" className="draft-label-icon" />
            <span className="draft-label">보낼 메세지</span>
          </div>
        </div>

        <textarea
          className="draft-textarea"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label="보낼 메세지"
        />

        <div className="draft-actions">
          <button type="button" className={`draft-secondary ${copied ? "copied" : ""}`} onClick={handleCopy}>
            <img src={copied ? checkIcon : copyIcon} alt="" aria-hidden="true" />
            {copied ? "복사 완료!" : "복사하기"}
          </button>
          <button type="button" className="draft-primary" onClick={handleShare}>
            <img src={shareIcon} alt="" aria-hidden="true" />
            공유하기
          </button>
        </div>

        <div className="warning-box" role="alert">
          <span className="warning-icon" aria-hidden="true">
            ⚠
          </span>
          직접 확인한 뒤 전달해주세요
        </div>
      </section>

      <BottomNav />
    </div>
  );
}


