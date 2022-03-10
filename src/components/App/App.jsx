import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import {Container} from '../App/App.styled'
import { nanoid } from "nanoid";

export default function App() {

    const [contacts, setContacts] = useState(
        () => {
            const items = localStorage.getItem('contacts');
          return  items ? JSON.parse(items) : [];
        }
    );  
    
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const addContact =  ({ name, number }) => {
        const normalizedName = name.toLowerCase();
        const contact = { id: nanoid(), name, number };
        const getContact = contacts.find(contact => contact.name.toLowerCase() === normalizedName);

        getContact ? alert(`${name} is already in contacts`) : setContacts(state => [contact, ...state]);    
    };

    const filteredContact = () => {
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
             contact.name.toLowerCase().includes(normalizedFilter));    
    };

    const changeFilter = event => {
        setFilter( event.currentTarget.value );
    }; 

    const deleteContact = (id) => {
        setContacts(contacts => 
            contacts.filter(contact => contact.id !== id)
        );
    };

    return (
        <Container>
            <h1>Phonebook</h1>

            <Form onSubmit={addContact}></Form>

            <Filter value={filter} onChange={changeFilter} />

            <h2>Contacts</h2>

            <ContactList
                filteredContact={filteredContact()}
                deleteContact={deleteContact}
            />
        </Container>
    );    
};