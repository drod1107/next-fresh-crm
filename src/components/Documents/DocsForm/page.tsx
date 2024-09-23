// src/components/Documents/DocsForm/page.tsx

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button, TextField, Paper, Chip, Autocomplete } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Doc } from '@/types/doc';
import { Contact } from '@/types/contact';

interface DocsFormProps {
  selectedDoc: Doc | null;
  onDocCreated: (doc: Doc) => void;
  onDocUpdated: (doc: Doc) => void;
}

const DocsForm: React.FC<DocsFormProps> = ({ selectedDoc, onDocCreated, onDocUpdated }) => {
  const { user } = useUser();
  const [doc_title, setDocTitle] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchContacts();
    if (selectedDoc) {
      setDocTitle(selectedDoc.doc_title);
      setLabels(selectedDoc.labels);
      setNotes(selectedDoc.notes);
      setSelectedContact(selectedDoc.contact as Contact);
    } else {
      clearForm();
    }
  }, [selectedDoc]);

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

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) {
      alert('Please select a contact');
      return;
    }

    const formData = new FormData();
    formData.append('doc_title', doc_title);
    formData.append('pb_username', user?.id || '');
    formData.append('pb_email', user?.primaryEmailAddress?.emailAddress || '');
    formData.append('labels', JSON.stringify(labels));
    formData.append('notes', notes);
    formData.append('contactId', selectedContact._id);

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (selectedDoc) {
        const response = await fetch(`/api/docs/${selectedDoc._id}`, {
          method: 'PUT',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to update doc');
        const updatedDoc: Doc = await response.json();
        onDocUpdated(updatedDoc);
      } else {
        const response = await fetch('/api/docs', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to create doc');
        const newDoc: Doc = await response.json();
        onDocCreated(newDoc);
      }
      clearForm();
    } catch (error) {
      console.error('Error submitting doc:', error);
    }
  };

  const clearForm = () => {
    setDocTitle('');
    setLabels([]);
    setNotes('');
    setSelectedContact(null);
    setFiles([]);
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
        {selectedDoc ? 'Edit Document' : 'Create New Document'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <TextField
          label="Document Title"
          value={doc_title}
          onChange={(e) => setDocTitle(e.target.value)}
          fullWidth
          required
        />
        <Autocomplete
          options={contacts}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => <TextField {...params} label="Select Contact" required />}
          value={selectedContact}
          onChange={(_, newValue) => setSelectedContact(newValue)}
          noOptionsText="No such contact found. Please confirm spelling or create this contact first."
        />
        <div {...getRootProps()} className={`border-2 border-dashed p-4 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
          <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        </div>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
        <div>
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
        />
        <Button type="submit" variant="contained" color="primary">
          {selectedDoc ? 'Update' : 'Create'} Document
        </Button>
      </form>
    </Paper>
  );
};

export default DocsForm;