import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import Button from "../conversationPage/ui/button/Button";
import personIcon from "../../assets/person.svg";
import peopleIcon from "../../assets/people.svg";
import contentIcon from "../../assets/content.svg";
import calendarIcon from "../../assets/calendar.svg";
import timeIcon from "../../assets/time.svg";
import { ROUTES } from "../../router/routes.constant";
import { chatConflict } from "../conversationPage/api/conflicts";
import { getProfile, saveProfileData } from "../conversationPage/storage/profile";

import "./RequestPage.css";

function makeRequestMessage(request) {
  return [
    `상대 이름: ${request.recipient.trim()}`,
    `관계: ${request.relationship || "기타"}`,
    `부탁 내용: ${request.content.trim()}`,
    `마감일: ${request.deadline || ""}`,
    `예상 소요 시간: ${request.duration || ""}`,
  ].join("\n");
}

function mergeById(existing = [], incoming = []) {
  const entries = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => entries.set(item.id, item));
  return [...entries.values()];
}

/** /conflicts/chat으로 입력 내용을 정리해 conflictContext를 만듦. summary가 없으면 null */
async function refineRequest(request) {
  const profile = getProfile();
  const result = await chatConflict(
    { schedules: profile.schedules, roles: profile.roles },
    null,
    [{ sender: "USER", content: makeRequestMessage(request) }],
  );
  const schedules = mergeById(profile.schedules, result.newSchedules);
  saveProfileData({ schedules, roles: mergeById(profile.roles, result.newRoles) });
  if (!result.summary) return null;

  const relatedIds = new Set(result.summary.relatedScheduleIds || []);
  return {
    recommendation: result.recommendation || null,
    conflictContext: {
      summary: result.summary,
      responseType: result.recommendation?.responseType ?? null,
      availableCondition: null,
      relatedSchedules: schedules.filter((item) => relatedIds.has(item.id)),
    },
  };
}

export default function RequestPage() {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitRequest = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const formData = new FormData(event.currentTarget);
    const request = {
      recipient: formData.get("recipient"),
      relationship: formData.get("relationship"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      duration: formData.get("duration"),
    };

    // 추가 질문 입력 UI는 없으므로(8d31e47) isInputComplete와 관계없이 한 번만 정리하고 다음 단계로 진행.
    // 정리에 실패해도 막지 않고, 대응 선택 화면에서 입력값만으로 conflictContext를 만듦.
    setSubmitting(true);
    let refined = null;
    try {
      refined = await refineRequest(request);
    } catch (error) {
      console.warn("요청 정리(/conflicts/chat) 실패, 입력값으로 진행합니다.", error);
    }
    navigate(ROUTES.RESPONSE_SELECTION, { state: { request, ...refined } });
  };

  return (
    <div className="page-shell request-page">
      <Header title="요청 정리하기" onBack={() => setShowExitModal(true)} />
      <h2 className="request-prompt">받은 부탁을 입력해 주세요.</h2>

      <form className="request-form" onSubmit={submitRequest}>
        <div className="field-row">
          <label htmlFor="recipient" className="field-label">
            <img src={personIcon} alt="" aria-hidden="true" />
            상대 이름
          </label>
          <input id="recipient" name="recipient" type="text" placeholder="입력하세요..." required />
        </div>

        <div className="field-row">
          <label htmlFor="relationship" className="field-label">
            <img src={peopleIcon} alt="" aria-hidden="true" />
            관계
          </label>
          <select id="relationship" name="relationship">
            <option value="">선택</option>
            <option value="동료/팀원">동료/팀원</option>
            <option value="선배/상사">선배/상사</option>
            <option value="후배">후배</option>
            <option value="친구">친구</option>
            <option value="연인">연인</option>
            <option value="가족">가족</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div className="field-row textarea-row">
          <label htmlFor="request-content" className="field-label">
            <img src={contentIcon} alt="" aria-hidden="true" />
            부탁 내용
          </label>
          <textarea id="request-content" name="content" rows="2" placeholder="입력하세요..." required />
        </div>

        <div className="field-row">
          <label htmlFor="deadline" className="field-label">
            <img src={calendarIcon} alt="" aria-hidden="true" />
            마감일
          </label>
          <input id="deadline" name="deadline" type="date" />
        </div>

        <div className="field-row">
          <label htmlFor="duration" className="field-label">
            <img src={timeIcon} alt="" aria-hidden="true" />
            예상 소요 시간
          </label>
          <select id="duration" name="duration">
            <option value="">선택</option>
            <option value="30분">30분</option>
            <option value="1시간">1시간</option>
            <option value="1시간 30분">1시간 30분</option>
            <option value="2시간 이상">2시간 이상</option>
          </select>
        </div>

        <Button type="submit" className="request-submit-button" disabled={submitting}>
          {submitting ? "요청 정리 중..." : "다음 단계로 넘어가기"}
        </Button>


        
      </form>

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


