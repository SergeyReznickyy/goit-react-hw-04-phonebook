import React, { useState } from 'react';
import css from './сontactForm.module.css';
import * as Yup from 'yup';

const ContactBook = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    ContactBook.validate({ name, number }, { abortEarly: false })
      .then(() => {
        onSubmit({ name, number });
        setName('');
        setNumber('');
        setErrors({});
      })
      .catch(error => {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.errors[0];
        });
        setErrors(validationErrors);
      });
  };

  return (
    <form className={css.contact_form} onSubmit={handleSubmit}>
      <div className={css.contact_form_wrapper}>
        <label className={css.text_label}>
          Name
          <input
            type="text"
            name="name"
            className={css.input}
            onChange={handleChange}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          {errors.name && <span className={css.error}>{errors.name}</span>}
        </label>
        <label className={css.text_label}>
          Number
          <input
            type="tel"
            name="number"
            className={css.input}
            onChange={handleChange}
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          {errors.number && <span className={css.error}>{errors.number}</span>}
        </label>
      </div>
      <button type="submit" className={css.btn_submit}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
