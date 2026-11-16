import statusRight from "../../public/assets/status-right.svg";
import "./StatusBar.css";

export default function StatusBar() {
  return (
    <div className="status-bar" aria-label="오전 9시 41분">
      <span>9:41</span>
      <img src={statusRight} alt="" aria-hidden="true" />
    </div>
  );
}
