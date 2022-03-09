import React from "react";
import propTypes from "prop-types";
import { ListItem, DeleteButton } from "./ContatcList.styled";

const ContactList = ({ filteredContact, deleteContact }) => {
    return (
        <ul>
            {filteredContact.map(contact => {
                return (
                    <ListItem key={contact.id}>{contact.name}: {contact.number}
                        <DeleteButton type="button"
                            onClick={() => deleteContact(contact.id)}>Delete</DeleteButton>
                    </ListItem>

                )
            })}
        </ul>
    )
};

ContactList.propTypes = {
    filteredContact: propTypes.array.isRequired,
    deleteContact: propTypes.func.isRequired
}

export default ContactList;