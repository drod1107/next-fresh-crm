// src/components/Contacts/ContactForm/page.tsx

import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Chip } from '@mui/material';
import { useDropzone } from 'react-dropzone';
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
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setEmail(selectedContact.email);
      setStreet(selectedContact.address.street);
      setCity(selectedContact.address.city);
      setState(selectedContact.address.state);
      setZip(selectedContact.address.zip);
      setPhoneNumber(selectedContact.phoneNumber);
      setAltPhone(selectedContact.altPhone);
      setLabels(selectedContact.labels);
      setNotes(selectedContact.notes);
    } else {
      clearForm();
    }
  }, [selectedContact]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setStreet('');
    setCity('');
    setState('');
    setZip('');
    setPhoneNumber('');
    setAltPhone('');
    setLabels([]);
    setNotes('');
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactData = {
      firstName,
      lastName,
      email,
      address: {
        street,
        city,
        state,
        zip,
      },
      phoneNumber,
      altPhone,
      labels,
      notes,
    };

    console.log('Data being sent:', contactData);

    try {
      const url = selectedContact ? `/api/contacts/${selectedContact._id}` : '/api/contacts';
      const method = selectedContact ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${selectedContact ? 'update' : 'create'} contact`);
      }

      const result = await response.json();

      if (selectedContact) {
        onContactUpdated(result);
      } else {
        onContactCreated(result);
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
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          fullWidth
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          fullWidth
        />
        <TextField
          label="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddLabel();
              }
            }}
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
          fullWidth
          multiline
          rows={4}
          className="col-span-2"
        />
        <div className="col-span-2">
          <div {...getRootProps()} className={`border-2 border-dashed p-4 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
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