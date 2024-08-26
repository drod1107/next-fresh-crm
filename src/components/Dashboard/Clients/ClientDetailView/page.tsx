'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Chip, Paper, Typography } from '@mui/material';
import { Contact } from '@/types/contact';

interface ClientDetailViewProps {
  contact: Contact;
  onClose: () => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ contact, onClose }) => {
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (field: keyof Contact, value: string) => {
    setEditedContact({ ...editedContact, [field]: value });
    setEditStates({ ...editStates, [field]: true });
  };

  const handleLabelChange = (newLabels: string[]) => {
    setEditedContact({ ...editedContact, labels: newLabels });
    setEditStates({ ...editStates, labels: true });
  };

  const handleSave = async (field: keyof Contact) => {
    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: editedContact[field] }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      const updatedContact: Contact = await response.json();
      setEditedContact(updatedContact);
      setEditStates({ ...editStates, [field]: false });
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const renderEditableField = (field: keyof Contact, label: string) => (
    <div className="mb-4">
      <TextField
        label={label}
        value={editedContact[field] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        fullWidth
        variant="outlined"
      />
      {editStates[field] && (
        <Button onClick={() => handleSave(field)} variant="contained" color="primary" className="mt-2">
          Save
        </Button>
      )}
    </div>
  );

  const renderLabels = () => (
    <div className="mb-4">
      <Typography variant="subtitle1">Labels</Typography>
      <div className="flex flex-wrap gap-2">
        {editedContact.labels.map((label, index) => (
          <Chip
            key={index}
            label={label}
            onDelete={() => handleLabelChange(editedContact.labels.filter((_, i) => i !== index))}
          />
        ))}
        <Chip
          label="+"
          onClick={() => {
            const newLabel = prompt('Enter new label:');
            if (newLabel) {
              handleLabelChange([...editedContact.labels, newLabel]);
            }
          }}
        />
      </div>
      {editStates.labels && (
        <Button onClick={() => handleSave('labels')} variant="contained" color="primary" className="mt-2">
          Save Labels
        </Button>
      )}
    </div>
  );

  return (
    <Paper elevation={3} className="p-6 max-w-2xl mx-auto">
      <Typography variant="h4" className="mb-4">Client Details</Typography>
      {renderEditableField('firstName', 'First Name')}
      {renderEditableField('lastName', 'Last Name')}
      {renderEditableField('email', 'Email')}
      {renderEditableField('address', 'Address')}
      {renderEditableField('phoneNumber', 'Phone Number')}
      {renderEditableField('altPhone', 'Alternative Phone')}
      {renderLabels()}
      {renderEditableField('notes', 'Notes')}
      <Button onClick={onClose} variant="contained" color="secondary" className="mt-4">
        Close
      </Button>
    </Paper>
  );
};

export default ClientDetailView;