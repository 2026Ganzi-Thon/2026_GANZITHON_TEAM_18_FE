import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import PersonalityCarousel from '../../components/personality-carousel/PersonalityCarousel';
import ToneExample from '../../components/tone-example/ToneExample';
import { usePracticeStore } from '../../practiceStore';
import { PERSONALITY_OPTIONS } from '../../constants/practice';
import { ROUTES } from '../../routes';
import { saveContact } from '../../storage/contacts';
import checkIcon from '../../assets/icons/check.svg';
import './PersonalityPage.css';

const DEFAULT_INDEX = 1; // 디자인 기본 선택: 눈치 주기형

/** 대화연습2: 상대 성격 선택 */
export default function PersonalityPage() {
  const navigate = useNavigate();
  const contact = usePracticeStore((s) => s.contact);
  const userName = usePracticeStore((s) => s.userName);
  const { setContact } = usePracticeStore.getState();

  const savedIndex = PERSONALITY_OPTIONS.findIndex((o) => o.value === contact.personalityTag);
  const [index, setIndex] = useState(savedIndex >= 0 ? savedIndex : DEFAULT_INDEX);

  if (!userName.trim() || !contact.name.trim() || !contact.relationCategory) {
    return <Navigate to={ROUTES.PRACTICE_PARTNER} replace />;
  }

  const selected = PERSONALITY_OPTIONS[index];

  const choose = () => {
    // 데이터구조설계 1-2: 상대 설정을 마치면 contacts에 추가 (같은 id면 갱신)
    const saved = saveContact({ ...contact, name: contact.name.trim(), personalityTag: selected.value });
    setContact({ id: saved.id, personalityTag: selected.value });
    navigate(ROUTES.PRACTICE_GOAL);
  };

  return (
    <Screen
      className="personality-page"
      bodyClassName="personality-page__body"
      header={<PageHeader title="AI 대화 연습" tone="light" onBack={() => navigate(ROUTES.PRACTICE_PARTNER)} />}
      footer={
        <Button icon={checkIcon} iconSize={24} onClick={choose}>
          이 유형으로 고를래요
        </Button>
      }
    >
      <h2 className="personality-page__heading">상대방의 성격을 골라주세요</h2>
      <div className="personality-page__carousel">
        <PersonalityCarousel options={PERSONALITY_OPTIONS} index={index} onChange={setIndex} />
      </div>
      <div className="personality-page__tone">
        <ToneExample text={selected.toneExample} />
      </div>
    </Screen>
  );
}
