import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from '../../lib/store';
import Screen from '../../layouts/screen/Screen';
import PageHeader from '../../ui/page-header/PageHeader';
import Button from '../../ui/button/Button';
import LabeledRow from '../../ui/labeled-row/LabeledRow';
import TextField from '../../ui/text-field/TextField';
import Select from '../../ui/select/Select';
import PeopleListSheet from '../../components/people-list-sheet/PeopleListSheet';
import { usePracticeStore } from '../../practiceStore';
import { listContacts, saveContact } from '../../storage/contacts';
import { getProfile, saveProfileName } from '../../storage/profile';
import { RELATION_LABEL } from '../../constants/labels';
import { ROUTES } from '../../routes';
import personIcon from '../../assets/icons/person.svg';
import peopleIcon from '../../assets/icons/people.svg';
import playIcon from '../../assets/icons/play.svg';
import documentIcon from '../../assets/icons/document.svg';
import plusIcon from '../../assets/icons/plus.svg';
import './PartnerSetupPage.css';

const RELATION_OPTIONS = Object.entries(RELATION_LABEL).map(([value, label]) => ({ value, label }));

/** 대화연습1: 내 이름 / 상대 이름 / 관계 */
export default function PartnerSetupPage() {
  const navigate = useNavigate();
  const { userName, contact } = usePracticeStore(useShallow((s) => ({ userName: s.userName, contact: s.contact })));
  const { setUserName, setContact } = usePracticeStore.getState();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [notice, setNotice] = useState('');

  // 내 이름은 profile에 저장해 두고 다음부터 기본값으로 채움
  useEffect(() => {
    const savedName = getProfile().name;
    if (savedName && !usePracticeStore.getState().userName) setUserName(savedName);
  }, [setUserName]);

  const isValid = userName.trim() && contact.name.trim() && contact.relationCategory;

  const openSheet = () => {
    setContacts(listContacts());
    setSheetOpen(true);
  };

  const addToList = () => {
    if (!contact.name.trim() || !contact.relationCategory) {
      setNotice('상대 이름과 관계를 먼저 입력해 주세요.');
      return;
    }
    const saved = saveContact({ ...contact, name: contact.name.trim() });
    setContact({ id: saved.id });
    setNotice(`${saved.name}님을 주변 인물 리스트에 저장했어요.`);
  };

  const next = () => {
    saveProfileName(userName.trim());
    navigate(ROUTES.PRACTICE_PERSONALITY);
  };

  return (
    <Screen
      className="partner-setup-page"
      header={<PageHeader title="AI 대화 연습" onBack={() => navigate(ROUTES.HOME)} />}
      footer={
        <Button icon={playIcon} disabled={!isValid} onClick={next}>
          성격 유형 정하러 가기
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
            onChange={(e) => setContact({ id: null, name: e.target.value })}
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
        <Button variant="outline" icon={documentIcon} onClick={openSheet}>
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

      <PeopleListSheet
        open={sheetOpen}
        contacts={contacts}
        onClose={() => setSheetOpen(false)}
        onSelect={(c) => {
          setContact(c);
          setSheetOpen(false);
          setNotice('');
        }}
      />
    </Screen>
  );
}
