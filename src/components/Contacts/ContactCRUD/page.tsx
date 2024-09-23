// src > components > Contacts > ContactCRUD > page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/page';
import ContactList from '../ContactList/page';
import ClientDetailView from '../../Dashboard/Clients/ClientDetailView/page';
import { TextField, Modal } from '@mui/material';
import { Contact } from '@/types/contact';

const ContactCRUD: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailViewOpen, setDetailViewOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const filterContacts = () => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleContactCreated = (newContact: Contact) => {
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const handleContactUpdated = (updatedContact: Contact) => {
    setContacts(prevContacts =>
      prevContacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact)
    );
    setSelectedContact(updatedContact);
  };

  const handleContactDeleted = (deletedContactId: string) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact._id !== deletedContactId)
    );
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setDetailViewOpen(false);
    setSelectedContact(null);
  };

  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Management</h2>
      <details className="mb-4" open={false}>
        <summary className="font-bold mb-2 text-lg cursor-pointer hover:underline focus:underline">Add/Edit Contact</summary>
        <ContactForm
          selectedContact={selectedContact}
          onContactCreated={handleContactCreated}
          onContactUpdated={handleContactUpdated}
        />
      </details>
      <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ContactList
        contacts={filteredContacts}
        onEditContact={setSelectedContact}
        onDeleteContact={handleContactDeleted}
        onViewContact={handleViewContact}
      />
      <Modal
        open={detailViewOpen}
        onClose={handleCloseDetailView}
        aria-labelledby="client-detail-modal"
        aria-describedby="client-detail-description"
      >
        <div>
          {selectedContact && (
            <ClientDetailView
              contact={selectedContact}
              onClose={handleCloseDetailView}
              onContactUpdated={handleContactUpdated}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ContactCRUD;