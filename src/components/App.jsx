import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/App.module.css';
import { ContactForm } from 'components/ContactForm/contactForm';
import { Filter } from 'components/Filter/filter';
import { ContactList } from 'components/Contact/contact';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandle = data => {
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid(5) }]);
  };

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const onFiltredСontacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={css.app}>
      <div className={css.app_container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandle} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} handleChange={handleChangeFilter} />
        <ContactList
          filtredСontacts={onFiltredСontacts()}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </div>
  );
}
