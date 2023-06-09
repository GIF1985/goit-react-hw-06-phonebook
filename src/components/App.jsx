import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const validateContact = (name, number) => {
    const namePattern = /^[a-zA-Zа-яА-Я\s]{2,20}$/;
    const numberPattern = /^\d+$/;

    if (!namePattern.test(name) || !numberPattern.test(number)) {
      alert('Enter valid characters for the contacts name and number.');
      return false;
    }

    const lowerCaseName = name.toLowerCase();
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === lowerCaseName
    );

    if (existingContact) {
      alert('A contact with the same name already exists.');
      return false;
    }

    return true;
  };

  const addContact = contact => {
    const { name, number } = contact;

    if (!validateContact(name, number)) {
      return;
    }

    const newContact = {
      id: Date.now(),
      name: name.toLowerCase(),
      number,
      creationDate: new Date().toISOString().slice(0, 10),
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const updateContact = (contactId, newName, newNumber) => {
    if (!validateContact(newName, newNumber)) {
      return;
    }

    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === contactId
          ? { ...contact, name: newName.toLowerCase(), number: newNumber }
          : contact
      )
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChangeFilter={changeFilter} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
        onUpdateContact={updateContact}
      />
    </div>
  );
};

export default App;
