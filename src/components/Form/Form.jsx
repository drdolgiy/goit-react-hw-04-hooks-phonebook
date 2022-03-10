import React, { useState } from 'react';
import { nanoid } from "nanoid";
import { ContactForm, ContactLabel, TelLabel, InputName } from "./Form.styled";

export default function Form({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return
        };
    };

    const nameInputId = nanoid();

    const reset = () => {
        setName('');
        setNumber('');
        return
    };
  
    const handleSubmit = e => {       
        e.preventDefault();
        onSubmit({ name, number });
        reset();
    };

    return (
        <ContactForm onSubmit={handleSubmit}>
            <ContactLabel htmlFor='this.nameInputId'>
                Name
                <InputName
                    type="text"
                    value={name}
                    onChange={handleChange}
                    id={nameInputId}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. 
                    For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </ContactLabel>

            <TelLabel>
                    Number
                    <input
                        type="tel"
                        value={number}
                        onChange={handleChange}
                        name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, 
                    parentheses and can start with +"
                    required
                    />
            </TelLabel>
            <button type='submit'>Add contact</button>
        </ContactForm>
    )   
};
