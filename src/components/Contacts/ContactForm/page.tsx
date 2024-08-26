import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Chip } from '@mui/material';
import { Contact } from '@/types/contact';

interface ContactFormProps {
  selectedContact: Contact | null;
  onContactCreated: (contact: Contact) => void;
  onContactUpdated: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  selectedContact,
  onContactCreated,
  onContactUpdated,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setEmail(selectedContact.email);
      setAddress(selectedContact.address);
      setPhoneNumber(selectedContact.phoneNumber);
      setAltPhone(selectedContact.altPhone);
      setLabels(selectedContact.labels);
      setNotes(selectedContact.notes);
    } else {
      clearForm();
    }
  }, [selectedContact]);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setAltPhone('');
    setLabels([]);
    setNotes('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactData: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'> = {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      altPhone,
      labels,
      notes,
    };

    try {
      if (selectedContact) {
        const response = await fetch(`/api/contacts/${selectedContact._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });
        if (!response.ok) throw new Error('Failed to update contact');
        const updatedContact: Contact = await response.json();
        onContactUpdated(updatedContact);
      } else {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });
        if (!response.ok) throw new Error('Failed to create contact');
        const newContact: Contact = await response.json();
        onContactCreated(newContact);
      }
      clearForm();
    } catch (error) {
      console.error('Error submitting contact:', error);
    }
  };

  const handleAddLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    setLabels(labels.filter(label => label !== labelToRemove));
  };

  return (
    <Paper elevation={3} className="p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">
        {selectedContact ? 'Edit Contact' : 'Create New Contact'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          type="email"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
        />
        <TextField
          label="Alternative Phone"
          value={altPhone}
          onChange={(e) => setAltPhone(e.target.value)}
          fullWidth
        />
        <div className="col-span-2">
          <TextField
            label="Add Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
          />
          <Button onClick={handleAddLabel}>Add</Button>
          <div className="mt-2">
            {labels.map((label) => (
              <Chip
                key={label}
                label={label}
                onDelete={() => handleRemoveLabel(label)}
                className="mr-1 mb-1"
              />
            ))}
          </div>
        </div>
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={3}
          fullWidth
          className="col-span-2"
        />
        <div className="col-span-2">
          <Button type="submit" variant="contained" color="primary">
            {selectedContact ? 'Update' : 'Create'} Contact
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default ContactForm;