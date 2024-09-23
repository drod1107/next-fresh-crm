// src > components > Contacts > ContactList > page.tsx

import React from 'react';
import { List, ListItem, Button } from '@mui/material';
import ContactCard from './ContactCard/page';
import { Contact } from '@/types/contact';

interface ContactListProps {
  contacts: Contact[];
  onEditContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  onViewContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEditContact,
  onDeleteContact,
  onViewContact,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      onDeleteContact(id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <List>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        contacts.map((contact) => (
          <ListItem key={contact._id} className="mb-2 flex flex-col items-stretch">
            <ContactCard contact={contact} />
            <div className="mt-2 flex justify-end">
              <Button onClick={() => onViewContact(contact)} className="mr-2">
                Upload or Edit
              </Button>
              <Button onClick={() => handleDelete(contact?._id || '')} color="error">
                Delete
              </Button>
            </div>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ContactList;