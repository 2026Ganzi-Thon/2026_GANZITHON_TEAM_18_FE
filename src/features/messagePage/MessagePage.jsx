import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import BottomNav from "../../components/BottomNav";
import PageHeader from "../conversationPage/ui/page-header/PageHeader";
import copyIcon from "../../assets/copy.svg";
import shareIcon from "../../assets/share.svg";
import { createMessageDraft } from "../conversationPage/api/conflicts";
import "./MessagePage.css";

function makeDraft(request, response) {
  const name = request?.recipient?.trim() || "상대방";
  const ask = request?.content?.trim() || "부탁한 일";
  if (response === "reject") return `${name}님, 미안해요. ${ask}는 이번에는 어려울 것 같아요. 이해해 주시면 고맙겠습니다.`;
  if (response === "conditionalAccept") return `${name}님, 부탁해 주셔서 고마워요. ${ask}는 일정 조정이 필요하지만, 가능한 시간을 함께 맞춰볼 수 있을까요?`;
  return `${name}님, 부탁해 주셔서 고마워요. ${ask} 도와드릴게요.`;
}

export default function MessagePage() {
  const { state } = useLocation();
  const initialDraft = useMemo(() => makeDraft(state?.request, state?.response), [state]);
  const [draft, setDraft] = useState(initialDraft);
  const [copied, setCopied] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftError, setDraftError] = useState("");
  const draftRequest = useRef(null);

  useEffect(() => {
    const context = state?.conflictContext;
    const responseType = state?.responseType || context?.responseType;
    if (!context?.summary || !responseType) return undefined;
    const requestKey = JSON.stringify({ summary: context.summary, responseType, availableCondition: context.availableCondition });
    if (draftRequest.current?.key !== requestKey) {
      draftRequest.current = {
        key: requestKey,
        promise: createMessageDraft({
          summary: context.summary,
          relatedSchedules: context.relatedSchedules || [],
          responseType,
          availableCondition: context.availableCondition || null,
          currentDraft: null,
          messages: [],
        }),
      };
    }
    let current = true;
    setDraftLoading(true);
    setDraftError("");
    draftRequest.current.promise.then((result) => {
      if (!current) return;
      if (result?.draft) setDraft(result.draft);
      if (!result?.draft) setDraftError("초안을 만들지 못했어요. 직접 내용을 입력해 주세요.");
    }).catch((error) => {
      if (current) setDraftError(error.message || "초안을 만들지 못했어요. 다시 시도해 주세요.");
    }).finally(() => {
      if (current) setDraftLoading(false);
    });
    return () => { current = false; };
  }, [state]);

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
    } catch {
      const field = document.querySelector(".draft-textarea");
      field?.select();
      document.execCommand("copy");
      field?.setSelectionRange(draft.length, draft.length);
    }
    setCopied(true);
  };

  const shareDraft = async () => {
    if (navigator.share) {
      try { await navigator.share({ text: draft }); } catch { /* share sheet dismissed */ }
    } else {
      await copyDraft();
    }
  };

  return (
    <div className="page-shell message-page">
      <PageHeader title="메시지 초안" />
      <section className="draft-section">
        <label htmlFor="draft-message" className="draft-label">보낼 메시지</label>
        {draftLoading && <p className="draft-status" role="status">초안을 만들고 있어요...</p>}
        {draftError && <p className="draft-error" role="alert">{draftError}</p>}
        <div className="draft-card">
          <textarea id="draft-message" className="draft-textarea" maxLength={200} value={draft} onChange={(event) => { setDraft(event.target.value); setCopied(false); }} />
          <span className="draft-count">{draft.length}/200</span>
        </div>
        <div className="draft-actions">
          <button type="button" className={`draft-copy ${copied ? "is-copied" : ""}`} onClick={copyDraft}>
            <img src={copyIcon} alt="" />{copied ? "복사 완료!" : "복사하기"}
          </button>
          <button type="button" className="draft-share" onClick={shareDraft}>
            <img src={shareIcon} alt="" />공유하기
          </button>
        </div>
        <aside className="draft-warning">
          <span className="warning-mark" aria-hidden="true">!</span>
          <span>직접 확인한 뒤 전달해 주세요.</span>
        </aside>
      </section>
      <BottomNav />
    </div>
  );
}
