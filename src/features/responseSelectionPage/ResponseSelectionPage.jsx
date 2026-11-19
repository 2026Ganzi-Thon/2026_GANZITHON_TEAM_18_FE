import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import Button from "../conversationPage/ui/button/Button";
import { ROUTES } from "../../router/routes.constant";
import { usePracticeStore } from "../conversationPage/practiceStore";
import { getProfile } from "../conversationPage/storage/profile";
import { RELATION_CATEGORY, RESPONSE_TYPE } from "../conversationPage/constants/enums";
import radioOn from "../conversationPage/assets/icons/radio-on.svg";
import radioOff from "../conversationPage/assets/icons/radio-off.svg";

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

const RELATION_CATEGORIES = {
  "동료/팀원": RELATION_CATEGORY.COLLEAGUE,
  "선배/상사": RELATION_CATEGORY.SENIOR,
  후배: RELATION_CATEGORY.JUNIOR,
  친구: RELATION_CATEGORY.FRIEND,
  연인: RELATION_CATEGORY.PARTNER,
  가족: RELATION_CATEGORY.FAMILY,
  기타: RELATION_CATEGORY.OTHER,
};

const RESPONSE_TYPES = {
  accept: RESPONSE_TYPE.ACCEPT,
  conditionalAccept: RESPONSE_TYPE.CONDITIONAL,
  reject: RESPONSE_TYPE.DECLINE,
};

function makeConflictContext(request, response, existingContext) {
  const durationMinutes = { "30분": 30, "1시간": 60, "1시간 30분": 90, "2시간 이상": 120 };
  const relation = request.relationship?.trim();
  const responseType = RESPONSE_TYPES[response];
  if (existingContext?.summary) {
    return {
      ...existingContext,
      responseType,
      availableCondition: responseType === RESPONSE_TYPE.CONDITIONAL
        ? existingContext.availableCondition || (request.duration ? `${request.duration} 정도 가능` : "가능한 시간과 범위를 조정해 도움 가능")
        : null,
    };
  }
  return {
    summary: {
      counterpartName: request.recipient?.trim() || "상대방",
      relationCategory: RELATION_CATEGORIES[relation] || RELATION_CATEGORY.OTHER,
      relationDetail: request.relationship || null,
      requestContent: request.content?.trim() || "부탁한 일",
      deadlineText: request.deadline || null,
      deadlineAt: request.deadline || null,
      estimatedMinutes: durationMinutes[request.duration] || null,
      psychologicalContext: null,
      relatedScheduleIds: [],
    },
    responseType,
    availableCondition: responseType === RESPONSE_TYPE.CONDITIONAL
      ? request.duration ? `${request.duration} 정도 가능` : "가능한 시간과 범위를 조정해 도움 가능"
      : null,
    relatedSchedules: [],
  };
}

export default function ResponseSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(() => (
    Object.entries(RESPONSE_TYPES).find(([, type]) => type === location.state?.recommendation?.responseType)?.[0]
      || optionList[0].id
  ));
  const [showExitModal, setShowExitModal] = useState(false);
  const startPractice = () => {
    const request = location.state?.request;
    if (!request?.recipient?.trim() || !request?.content?.trim()) {
      // 충돌 정리 내용이 없으면 대화 연습을 시작할 수 없으므로 충돌 정리로 되돌림
      navigate(ROUTES.REQUEST);
      return;
    }
    const practiceStore = usePracticeStore.getState();
    const userName = practiceStore.userName.trim() || getProfile().name?.trim() || "나";
    navigate("/conversation?step=personality", {
      state: { userName, conflictContext: makeConflictContext(request, selectedId, location.state?.conflictContext) },
    });
  };

  return (
    <div className="page-shell response-selection-page">
      <Header
        title="대응 선택하기"
        onBack={() => setShowExitModal(true)}
      />
      <h2 className="response-prompt">어떻게 대응할까요?</h2>
      

      <section className="response-options">
        {optionList.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              className={`response-option ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedId(option.id)}
              aria-pressed={isSelected}
            >
              <img className="option-select-icon" src={isSelected ? radioOn : radioOff} alt="" aria-hidden="true" />
              <span className="option-copy">
                <span className="option-tag">{option.title}</span>
                <span className="option-detail">{option.detail}</span>
              </span>
            </button>
          );
        })}
      </section>

      <div className="response-actions">
        <Button fullWidth className="response-action-button" onClick={startPractice}>
          말하기 전에 연습하기
        </Button>
        <Button variant="outline" fullWidth className="response-action-button" onClick={() => navigate(ROUTES.MESSAGE, { state: { request: location.state?.request, response: selectedId, responseType: RESPONSE_TYPES[selectedId], conflictContext: makeConflictContext(location.state?.request || {}, selectedId, location.state?.conflictContext) } })}>
          메시지 초안 보기
        </Button>
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
