import React, { Component } from 'react';
import { nanoid } from "nanoid";
import { ContactForm, ContactLabel, TelLabel, InputName } from "./Form.styled"

class Form extends Component {
    state = {
        name: '',
        number: ''
    }

    nameInputId = nanoid();

    handleNameChange = event => {
        // const { name, number } = event.currentTarget.value;
        this.setState({ name: event.currentTarget.value });
    };

    handleNumberChange = event => {
        // const { name, number } = event.currentTarget.value;
        this.setState({ number: event.currentTarget.value });
    };



    handleSubmit = event => {
        event.preventDefault();
        // console.log(this.state.name);

        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: ''
        })
    };


    render() {
        return (

            <ContactForm onSubmit={this.handleSubmit}>
                <ContactLabel htmlFor='this.nameInputId'>
                    Name
                    <InputName
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        id={this.nameInputId}
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
                        value={this.state.number}
                        onChange={this.handleNumberChange}
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
};

export default Form;