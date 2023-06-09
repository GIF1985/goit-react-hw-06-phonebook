import React, { useCallback } from 'react';
import ContactListItemWithDelete from '../ContactListItemWithDelete/ContactListItemWithDelete';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  const handleDeleteContact = useCallback(
    id => {
      onDeleteContact(id);
    },
    [onDeleteContact]
  );

  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <ContactListItemWithDelete
          key={contact.id}
          contact={contact}
          onDelete={handleDeleteContact}
          className={styles.contactListItem}
        />
      ))}
    </ul>
  );
};

export default ContactList;
