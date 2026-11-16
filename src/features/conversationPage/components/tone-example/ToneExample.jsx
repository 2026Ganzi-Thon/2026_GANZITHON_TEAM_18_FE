import ChatBubble from '../chat-bubble/ChatBubble';
import './ToneExample.css';

export default function ToneExample({ text }) {
  return (
    <section className="tone-example">
      <h2 className="tone-example__title">말투 예시</h2>
      <ChatBubble sender="AI" content={text} wide />
    </section>
  );
}
