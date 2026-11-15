import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { ROUTES } from "../../router/routes.constant";

import "./ResponseSelectionPage.css";

const optionList = [
  {
    id: "accept",
    title: "수락",
    detail: "요청을 즉시 받아들이고, 감사 인사를 함께 전달하는 답변",
  },
  {
    id: "conditionalAccept",
    title: "조건부 수락",
    detail: "일부 조건을 제시하며 가능성을 유지하는 유연한 답변",
  },
  {
    id: "reject",
    title: "거절",
    detail: "부드럽게 사유를 설명하고, 거절 의사를 분명히 전달하는 답변",
  },
];

export default function ResponseSelectionPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(optionList[0].id);
  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <div className="page-shell response-selection-page">
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
        <button type="button" className="secondary-button" onClick={() => navigate(ROUTES.MESSAGE)}>
          메시지 초안 보기
        </button>
        <button type="button" className="primary-button" onClick={() => navigate(ROUTES.CONVERSATION)}>
          연습 시작
        </button>
      </div>

      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <h2>정말 나가겠습니까?</h2>
            <p>작성 중인 내용은 저장되지 않습니다.</p>

            <div className="exit-modal-actions">
              <button type="button" className="modal-cancel" onClick={() => setShowExitModal(false)}>
                계속하기
              </button>
              <button
                type="button"
                className="modal-confirm"
                onClick={() => {
                  setShowExitModal(false);
                  navigate(ROUTES.MAIN);
                }}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
