'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const formRef = useRef<HTMLDivElement>(null);

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
    setSelectedContact(null);
  };

  const handleContactDeleted = (deletedContactId: string) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact._id !== deletedContactId)
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      <div ref={formRef}>
        <ContactForm
          selectedContact={selectedContact}
          onContactCreated={handleContactCreated}
          onContactUpdated={handleContactUpdated}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Search Contacts"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ContactList
        contacts={filteredContacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleContactDeleted}
        onViewContact={handleViewContact}
      />
      <Modal
        open={detailViewOpen}
        onClose={handleCloseDetailView}
        aria-labelledby="client-detail-modal"
        aria-describedby="client-detail-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
          {selectedContact && (
            <ClientDetailView
              contact={selectedContact}
              onClose={handleCloseDetailView}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ContactCRUD;