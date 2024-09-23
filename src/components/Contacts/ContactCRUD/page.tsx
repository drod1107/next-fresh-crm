// src/components/Contacts/ContactCRUD/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ContactForm from '../ContactForm/page';
import ContactList from '../ContactList/page';
import ClientDetailView from '../../Dashboard/Clients/ClientDetailView/page';
import { TextField, Modal, Box } from '@mui/material';
import { Contact } from '@/types/contact';

const ContactCRUD: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailViewOpen, setDetailViewOpen] = useState(false);

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

  const filterContacts = useCallback(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [contacts, searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [filterContacts]);

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
      <ContactForm
        selectedContact={selectedContact}
        onContactCreated={handleContactCreated}
        onContactUpdated={handleContactUpdated}
      />
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
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}>
          {selectedContact && (
            <ClientDetailView
              contact={selectedContact}
              onClose={handleCloseDetailView}
              onContactUpdated={handleContactUpdated}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ContactCRUD;