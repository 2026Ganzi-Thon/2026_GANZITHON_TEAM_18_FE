import bulbImg from '../../assets/images/bulb.png';
import './Bulb.css';

/** 전구 이미지 (Figma와 같은 크롭). size: 보이는 영역 px */
export default function Bulb({ size = 24 }) {
  return (
    <span className="bulb" style={{ width: size, height: size }} aria-hidden>
      <span className="bulb__frame">
        <img className="bulb__img" src={bulbImg} alt="" />
      </span>
    </span>
  );
}
