import { KEYS, read, write } from './localStore';
import { createId } from '../models/simulation';

/** @returns {import('../models/simulation').Contact[]} */
export function listContacts() {
  return read(KEYS.CONTACTS, []);
}

/**
 * 같은 id(없으면 같은 이름 + 관계 분류)가 있으면 갱신, 없으면 추가.
 * @param {Partial<import('../models/simulation').Contact>} contact
 * @returns {import('../models/simulation').Contact}
 */
export function saveContact(contact) {
  const contacts = listContacts();
  const index = contacts.findIndex(
    (c) =>
      (contact.id && c.id === contact.id) ||
      (c.name === contact.name && c.relationCategory === contact.relationCategory),
  );
  const saved = {
    relationDetail: null,
    personalityTag: null,
    speechStyle: null,
    ...(index >= 0 ? contacts[index] : {}),
    ...contact,
    id: index >= 0 ? contacts[index].id : contact.id || createId(),
  };
  if (index >= 0) contacts[index] = saved;
  else contacts.unshift(saved);
  write(KEYS.CONTACTS, contacts);
  return saved;
}
