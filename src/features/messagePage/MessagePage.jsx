import BottomNav from "../../components/BottomNav";

import "./MessagePage.css";



export default function MessagePage() {
  return (
    <div className="page-shell message-page">
      <header className="page-header">
        <div className="brand-wrap">
          <span className="brand-name">메시지</span>
        </div>
      </header>

      <BottomNav />
    </div>
  );
}


