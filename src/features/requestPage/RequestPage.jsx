import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import StatusBar from "../../components/StatusBar";
import personIcon from "../../assets/person.svg";
import peopleIcon from "../../assets/people.svg";
import contentIcon from "../../assets/content.svg";
import calendarIcon from "../../assets/calendar.svg";
import timeIcon from "../../assets/time.svg";
import { ROUTES } from "../../router/routes.constant";

import "./RequestPage.css";

const durationOptions = ["30분", "1시간", "1시간 30분", "2시간 이상"];

export default function RequestPage() {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [duration, setDuration] = useState("");
  const [request, setRequest] = useState({ recipient: "", relationship: "", content: "", deadline: "" });
  const updateRequest = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));

  return (
    <div className="page-shell request-page">
      <StatusBar />
      <Header title="요청 정리하기" onBack={() => setShowExitModal(true)} />

      <form
        className="request-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(ROUTES.RESPONSE_SELECTION, { state: { request: { ...request, duration } } });
        }}
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

        <div className="request-actions">
          <button type="submit" className="primary-button">
            대응 선택하기
          </button>
        </div>
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


