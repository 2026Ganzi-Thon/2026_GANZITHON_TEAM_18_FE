import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from '../../lib/store';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import LabeledRow from '../../ui/labeled-row/LabeledRow';
import TextField from '../../ui/text-field/TextField';
import Select from '../../ui/select/Select';
import { usePracticeStore } from '../../practiceStore';
import { saveContact } from '../../storage/contacts';
import { getProfile, saveProfileName } from '../../storage/profile';
import { RELATION_LABEL } from '../../constants/labels';
import { ROUTES } from '../../routes';
import personIcon from '../../assets/icons/person.svg';
import peopleIcon from '../../assets/icons/people.svg';
import playIcon from '../../assets/icons/play.svg';
import documentIcon from '../../assets/icons/document.svg';
import plusIcon from '../../assets/icons/plus.svg';
import './PartnerSetupPage.css';

/** 이름을 다 지우면 다른 사람을 새로 입력하는 것으로 보고, 불러온 인물의 성격·말투를 비웁니다 */
const CLEARED_PERSON = { personalityTag: null, speechStyle: null };

const RELATION_OPTIONS = Object.entries(RELATION_LABEL).map(([value, label]) => ({ value, label }));

/** 대화연습1: 내 이름 / 상대 이름 / 관계 */
export default function PartnerSetupPage() {
  const navigate = useNavigate();
  const { userName, contact } = usePracticeStore(
    useShallow((s) => ({ userName: s.userName, contact: s.contact })),
  );
  const { setUserName, setContact, clearConflictContext } = usePracticeStore.getState();

  const [notice, setNotice] = useState('');

  // 내 이름은 profile에 저장해 두고 다음부터 기본값으로 채움
  useEffect(() => {
    const savedName = getProfile().name;
    if (savedName && !usePracticeStore.getState().userName) setUserName(savedName);
  }, [setUserName]);

  // 충돌 정리를 거치지 않아도 시작 가능 (conflictContext는 있으면 보내고, 없으면 null)
  const isValid = userName.trim() && contact.name.trim() && contact.relationCategory;

  const addToList = () => {
    if (!contact.name.trim() || !contact.relationCategory) {
      setNotice('상대 이름과 관계를 먼저 입력해 주세요.');
      return;
    }
    const saved = saveContact({ ...contact, name: contact.name.trim() });
    setContact({ id: saved.id });
    setNotice(`${saved.name}님을 주변 인물 리스트에 저장했어요.`);
  };

  // 이전 화면이 앱 안에 있으면 그 화면으로, 직접 열었거나 새로고침해서 기록이 없으면 홈으로
  const goBack = () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate(ROUTES.HOME);
  };

  // 주변 인물에서 불러온 사람에게 성격이 이미 있으면 성격 선택을 건너뛰고 목표로 바로 이동
  const hasPersonality = Boolean(contact.personalityTag);

  const next = () => {
    saveProfileName(userName.trim());
    if (hasPersonality) navigate(ROUTES.PRACTICE_GOAL);
    else navigate(ROUTES.PRACTICE_PERSONALITY);
  };

  return (
    <Screen
      className="partner-setup-page"
      header={<PageHeader title="AI 대화 연습" onBack={goBack} />}
      footer={
        <Button icon={playIcon} disabled={!isValid} onClick={next}>
          {hasPersonality ? '대화 목표 정하러 가기' : '성격 유형 정하러 가기'}
        </Button>
      }
    >
      <h2 className="partner-setup-page__heading">받은 부탁을 입력해 주세요.</h2>

      <div className="partner-setup-page__fields">
        <LabeledRow icon={personIcon} iconWidth={18} iconHeight={18.75} label="내 이름" htmlFor="user-name">
          <TextField id="user-name" value={userName} maxLength={20} onChange={(e) => setUserName(e.target.value)} />
        </LabeledRow>
        <LabeledRow icon={personIcon} iconWidth={18} iconHeight={18.75} label="상대 이름" htmlFor="contact-name">
          <TextField
            id="contact-name"
            value={contact.name}
            maxLength={20}
            onChange={(e) => {
              const name = e.target.value;
              // 오타 수정 정도는 성격 유지, 이름을 다 지우면 새 사람으로 보고 성격 초기화
              setContact({ id: null, ...(name.trim() ? {} : CLEARED_PERSON), name });
              // 이름을 다 지우면 다른 사람으로 보고, 이전 충돌 정리 내용도 보내지 않음 (오타 수정은 유지)
              if (!name.trim()) clearConflictContext();
            }}
          />
        </LabeledRow>
        <LabeledRow icon={peopleIcon} iconWidth={23.3467} iconHeight={18.75} label="관계" htmlFor="relation">
          <Select
            id="relation"
            options={RELATION_OPTIONS}
            value={contact.relationCategory}
            onChange={(e) => setContact({ id: null, relationCategory: e.target.value })}
          />
        </LabeledRow>
      </div>

      <div className="partner-setup-page__list-buttons">
        <Button variant="outline" icon={documentIcon} onClick={() => navigate(ROUTES.PRACTICE_PEOPLE)}>
          주변 인물 리스트 불러오기
        </Button>
        <Button variant="outline" icon={plusIcon} iconSize={18} onClick={addToList}>
          리스트에 추가
        </Button>
        {notice && (
          <p className="partner-setup-page__notice" role="status">
            {notice}
          </p>
        )}
      </div>
    </Screen>
  );
}
