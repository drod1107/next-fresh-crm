// src/app/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, TextField } from '@mui/material';
import ContactList from '../components/Contacts/ContactList/page';
import DocsList from '../components/Documents/DocsList/page';
import { Contact } from '@/types/contact';
import { Doc } from '@/types/doc';

const Dashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
    fetchDocs();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchDocs = async () => {
    try {
      const response = await fetch('/api/docs');
      if (!response.ok) throw new Error('Failed to fetch docs');
      const data = await response.json();
      setDocs(data);
    } catch (error) {
      console.error('Error fetching docs:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocs = docs.filter(doc =>
    `${doc.doc_title} ${doc.notes}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <TextField
        fullWidth
        label="Search contacts and documents"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Contacts</Typography>
            <ContactList contacts={filteredContacts} onEditContact={() => {}} onDeleteContact={() => {}} onViewContact={() => {}} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Documents</Typography>
            <DocsList docs={filteredDocs} onEditDoc={() => { } } onDeleteDoc={() => { } } onViewDoc={() => { } } onDownloadDoc={function (doc: Doc, documentIndex: number): void {
              throw new Error('Function not implemented.');
            } } />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;