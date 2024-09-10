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
  const [address, setAddress] = useState('');
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
      setAddress(selectedContact.address);
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
    setAddress('');
    setPhoneNumber('');
    setAltPhone('');
    setLabels([]);
    setNotes('');
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('altPhone', altPhone);
    formData.append('labels', JSON.stringify(labels));
    formData.append('notes', notes);

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (selectedContact) {
        const response = await fetch(`/api/contacts/${selectedContact._id}`, {
          method: 'PUT',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to update contact');
        const updatedContact: Contact = await response.json();
        onContactUpdated(updatedContact);
      } else {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          body: formData,
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
        {/* ... (existing form fields) ... */}
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