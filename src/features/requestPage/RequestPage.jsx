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
import { RELATION_CATEGORY } from "../conversationPage/constants/enums";

import "./RequestPage.css";

const durationOptions = ["30분", "1시간", "1시간 30분", "2시간 이상"];
const relationCategories = { 선배: RELATION_CATEGORY.SENIOR, 동료: RELATION_CATEGORY.COLLEAGUE, 친구: RELATION_CATEGORY.FRIEND, 가족: RELATION_CATEGORY.FAMILY };
const durationMinutes = { "30분": 30, "1시간": 60, "1시간 30분": 90, "2시간 이상": 120 };

function makeRequestMessage(request, duration) {
  return [
    `상대 이름: ${request.recipient.trim()}`,
    `관계: ${request.relationship || "기타"}`,
    `부탁 내용: ${request.content.trim()}`,
    `마감일: ${request.deadline || ""}`,
    `예상 소요 시간: ${duration || ""}`,
  ].join("\n");
}

function mergeById(existing = [], incoming = []) {
  const entries = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => entries.set(item.id, item));
  return [...entries.values()];
}

export default function RequestPage() {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [duration, setDuration] = useState("");
  const [request, setRequest] = useState({ recipient: "", relationship: "", content: "", deadline: "" });
  const [conflictMessages, setConflictMessages] = useState([]);
  const [needsDetails, setNeedsDetails] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const updateRequest = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submitRequest = async (event) => {
    event.preventDefault();
    setApiError("");
    const userMessage = needsDetails ? followUp.trim() : makeRequestMessage(request, duration);
    if (!userMessage) {
      setApiError("추가로 필요한 내용을 입력해 주세요.");
      return;
    }
    const messages = needsDetails
      ? [...conflictMessages, { sender: "USER", content: userMessage }]
      : [{ sender: "USER", content: userMessage }];
    setSubmitting(true);
    try {
      const profile = getProfile();
      const result = await chatConflict({ schedules: profile.schedules, roles: profile.roles }, null, messages);
      const latestProfile = getProfile();
      const newSchedules = result.newSchedules || [];
      const newRoles = result.newRoles || [];
      saveProfileData({ schedules: mergeById(latestProfile.schedules, newSchedules), roles: mergeById(latestProfile.roles, newRoles) });
      const summary = {
        counterpartName: result.summary?.counterpartName || request.recipient.trim(),
        relationCategory: result.summary?.relationCategory || relationCategories[request.relationship] || RELATION_CATEGORY.OTHER,
        relationDetail: result.summary?.relationDetail || request.relationship || null,
        requestContent: result.summary?.requestContent || request.content.trim(),
        deadlineText: result.summary?.deadlineText || request.deadline || null,
        deadlineAt: result.summary?.deadlineAt || (request.deadline ? `${request.deadline}T23:59:00+09:00` : null),
        estimatedMinutes: result.summary?.estimatedMinutes ?? durationMinutes[duration] ?? null,
        psychologicalContext: result.summary?.psychologicalContext || null,
        relatedScheduleIds: result.summary?.relatedScheduleIds || [],
      };
      const history = [...messages, { sender: "AI", content: result.aiMessage }];
      setConflictMessages(history);
      setAiPrompt(result.aiMessage || "상황을 조금 더 자세히 알려주세요.");
      setSuggestedTags(result.suggestedTags || []);
      setNeedsDetails(!result.isInputComplete);
      setFollowUp("");
      if (result.isInputComplete) {
        const relatedIds = new Set(summary.relatedScheduleIds);
        const relatedSchedules = [...latestProfile.schedules, ...newSchedules].filter((item) => relatedIds.has(item.id));
        const fallbackType = result.recommendation?.responseType || "CONDITIONAL";
        const recommendation = result.recommendation || { responseType: fallbackType, reason: "정리한 상황을 바탕으로 대응 방식을 선택해 주세요." };
        navigate(ROUTES.RESPONSE_SELECTION, {
          state: {
            request: { ...request, duration },
            conflictContext: { summary, responseType: recommendation.responseType, availableCondition: null, relatedSchedules },
            recommendation,
          },
        });
      }
    } catch (error) {
      setApiError(error.message || "요청 내용을 정리하지 못했어요. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell request-page">
      <Header title="요청 정리하기" onBack={() => setShowExitModal(true)} />
      <h2 className="request-prompt">받은 부탁을 입력해 주세요.</h2>

      <form
        className={`request-form ${needsDetails ? "has-followup" : ""}`}
        onSubmit={submitRequest}
      >
        <div className="field-row">
          <label htmlFor="recipient" className="field-label">
            <img src={personIcon} alt="" aria-hidden="true" />
            상대 이름
          </label>
          <input id="recipient" name="recipient" type="text" placeholder="입력하세요..." value={request.recipient} onChange={updateRequest} required />
        </div>

        <div className="field-row">
          <label htmlFor="relationship" className="field-label">
            <img src={peopleIcon} alt="" aria-hidden="true" />
            관계
          </label>
          <select id="relationship" name="relationship" value={request.relationship} onChange={updateRequest}>
            <option value="">선택</option>
            <option value="선배">선배</option><option value="동료">동료</option><option value="친구">친구</option><option value="가족">가족</option>
          </select>
        </div>

        <div className="field-row textarea-row">
          <label htmlFor="request-content" className="field-label">
            <img src={contentIcon} alt="" aria-hidden="true" />
            부탁 내용
          </label>
          <textarea id="request-content" name="content" rows="2" placeholder="입력하세요..." value={request.content} onChange={updateRequest} required />
        </div>

        <div className="field-row">
          <label htmlFor="deadline" className="field-label">
            <img src={calendarIcon} alt="" aria-hidden="true" />
            마감일
          </label>
          <input id="deadline" name="deadline" type="date" value={request.deadline} onChange={updateRequest} />
        </div>

        <div className="field-row">
          <label htmlFor="duration" className="field-label">
            <img src={timeIcon} alt="" aria-hidden="true" />
            예상 소요 시간
          </label>
          <select id="duration" value={duration} onChange={(event) => setDuration(event.target.value)}>
            <option value="">선택</option>
            {durationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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


