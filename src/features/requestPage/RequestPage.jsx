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

import "./RequestPage.css";

export default function RequestPage() {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const submitRequest = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    navigate(ROUTES.RESPONSE_SELECTION, {
      state: {
        request: {
          recipient: formData.get("recipient"),
          relationship: formData.get("relationship"),
          content: formData.get("content"),
          deadline: formData.get("deadline"),
          duration: formData.get("duration"),
        },
      },
    });
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

        <Button type="submit" className="request-submit-button">
          다음 단계로 넘어가기
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


