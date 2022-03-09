
import React, { Component } from 'react';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import {Container} from '../App/App.styled'
import { nanoid } from "nanoid";


class App extends Component {
    state = {
        contacts: [],
        filter: ''
    };

    addContact = data => {
        const findContact = this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());

        if (findContact) { return alert(`${findContact.name} is already in contacts`); }

        const contact = {
            id: nanoid(),
            name: data.name,
            number: data.number
        };

        this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
        }));

    };

    deleteContact = (id) => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts.filter((contact) => contact.id !== id)],
        }));
    };

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getFilteredContact = () => {
        const { filter, contacts } = this.state;
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter));
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    };

    componentDidUpdate(prevProps, prevState) {

        if (this.state.contacts !== prevState.contacts) {
 
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        };
    };

    render() {

        const { filter, contacts } = this.state;
        const filteredContacts = this.getFilteredContact();
        const addContact = this.addContact;
        const changeFilter = this.changeFilter;

        return (
            <Container>

                <h1>Phonebook</h1>

                <Form onSubmit={addContact}></Form>

                <Filter value={filter} onChange={changeFilter} />

                <h2>Contacts</h2>

                <ContactList contacts={contacts}
                    filteredContact={filteredContacts}
                    deleteContact={this.deleteContact} />
            </Container>
        );
    }
};

export default App;