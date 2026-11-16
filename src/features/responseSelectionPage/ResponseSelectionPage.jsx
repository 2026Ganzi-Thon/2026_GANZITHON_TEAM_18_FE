import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import StatusBar from "../../components/StatusBar";
import { ROUTES } from "../../router/routes.constant";

import "./ResponseSelectionPage.css";

const optionList = [
  {
    id: "accept",
    title: "수락",
    detail: "요청한 대로 도와줄게요.",
  },
  {
    id: "conditionalAccept",
    title: "조건부 수락",
    detail: "시간이나 범위를 조정해서 도와줄게요.",
  },
  {
    id: "reject",
    title: "거절",
    detail: "아쉽지만 이번에는 어려워요.",
  },
];

export default function ResponseSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(optionList[0].id);
  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <div className="page-shell response-selection-page">
      <StatusBar />
      <Header
        title="대응 선택하기"
        onBack={() => setShowExitModal(true)}
      />

      <section className="response-options">
        {optionList.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              className={`response-option ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedId(option.id)}
            >
              <span className="option-tag">{option.title}</span>
              <span className="option-detail">{option.detail}</span>
            </button>
          );
        })}
      </section>

      <div className="response-actions">
        <button type="button" className="secondary-button" onClick={() => navigate(ROUTES.CONVERSATION)}>
          말하기 전에 연습하기
        </button>
        <button type="button" className="primary-button" onClick={() => navigate(ROUTES.MESSAGE, { state: { request: location.state?.request, response: selectedId } })}>
          메시지 초안 보기
        </button>
      </div>

      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <h2>정말 페이지를 벗어나실 건가요?</h2>
            <p>입력한 내용은 저장되지 않아요.</p>

            <div className="exit-modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => {
                  setShowExitModal(false);
                  navigate(ROUTES.MAIN);
                }}
              >
                나가기
              </button>
              <button type="button" className="modal-confirm" onClick={() => setShowExitModal(false)}>
                계속하기
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
