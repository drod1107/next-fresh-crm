// src/components/Dashboard/Clients/ClientDetailView/page.tsx

'use client';

import React from 'react';
import { Typography, Button, TextField, Chip, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Contact } from '@/types/contact';

interface ClientDetailViewProps {
  contact: Contact;
  onClose: () => void;
  onContactUpdated: (updatedContact: Contact) => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ contact, onClose, onContactUpdated }) => {
  // Add state and handlers for editing contact details here

  return (
    <Paper elevation={3} className="p-6">
      <Typography variant="h4" gutterBottom>Client Details</Typography>
      
      <TextField
        label="First Name"
        value={contact.firstName}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Last Name"
        value={contact.lastName}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Email"
        value={contact.email}
        fullWidth
        margin="normal"
        disabled
      />
      {/* Add more fields as needed */}
      
      <Typography variant="h6" gutterBottom className="mt-4">Labels</Typography>
      <div className="flex flex-wrap gap-2 mb-4">
        {contact.labels.map((label, index) => (
          <Chip key={index} label={label} />
        ))}
      </div>
      
      <Typography variant="h6" gutterBottom>Documents</Typography>
      <List>
        {contact.documents?.map((doc, index) => (
          <ListItem key={index}>
            <ListItemText primary={doc.name} secondary={doc.label} />
          </ListItem>
        ))}
      </List>
      
      <Button onClick={onClose} variant="contained" color="primary" className="mt-4">
        Close
      </Button>
    </Paper>
  );
};

export default ClientDetailView;