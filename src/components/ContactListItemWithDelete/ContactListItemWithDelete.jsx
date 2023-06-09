import React, { useCallback } from 'react';
import styles from './ContactListItemWithDelete.module.css';

const ContactListItemWithDelete = ({ contact, onDelete }) => {
  const { id, name, number, creationDate } = contact;

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <li className={styles.contactListItem}>
      <p>{name}</p>
      <p>{number}</p>
      <p>{creationDate}</p>
      <button className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default ContactListItemWithDelete;
