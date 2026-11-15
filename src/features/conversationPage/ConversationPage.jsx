import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { ROUTES } from "../../router/routes.constant";

import "./ConversationPage.css";

export default function ConversationPage() {
  const navigate = useNavigate();

  return (
    <div className="page-shell conversation-page">
      <Header title="대화 연습" />

    

      <BottomNav />
    </div>
  );
}
