// src > components > Dashboard > Clients > ClientDetailView > page.tsx

'use client';

import React, { useState } from 'react';
import { TextField, Button, Chip, Paper, Typography, List, ListItem, ListItemText, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Contact } from '@/types/contact';
import FileUpload from '../FileUpload/page';

interface ClientDetailViewProps {
  contact: Contact;
  onClose: () => void;
  onContactUpdated: (updatedContact: Contact) => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ contact, onClose, onContactUpdated }) => {
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

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
      onContactUpdated(updatedContact);
      setSnackbar({ open: true, message: 'Contact updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating contact:', error);
      setSnackbar({ open: true, message: 'Error updating contact', severity: 'error' });
    }
  };

  const handleFileAction = async (fileUrl: string, fileName: string, action: 'download' | 'view') => {
    try {
      const response = await fetch(`/api/file/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl }),
      });

      if (!response.ok) {
        throw new Error(`Error ${action === 'download' ? 'downloading' : 'viewing'} file`);
      }

      const { signedUrl } = await response.json();

      if (action === 'download') {
        // Fetch the file content
        const fileResponse = await fetch(signedUrl);
        const blob = await fileResponse.blob();

        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } else {
        window.open(signedUrl, '_blank');
      }
    } catch (error) {
      console.error(`Error ${action === 'download' ? 'downloading' : 'viewing'} file:`, error);
      setSnackbar({ open: true, message: `Error ${action === 'download' ? 'downloading' : 'viewing'} file`, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileUploaded = () => {
    fetchUpdatedContact();
  };

  const fetchUpdatedContact = async () => {
    try {
      const response = await fetch(`/api/contacts/${contact._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch updated contact');
      }
      const updatedContact: Contact = await response.json();
      setEditedContact(updatedContact);
      onContactUpdated(updatedContact);
      setSnackbar({ open: true, message: 'File uploaded successfully', severity: 'success' });
    } catch (error) {
      console.error('Error fetching updated contact:', error);
      setSnackbar({ open: true, message: 'Error updating contact after file upload', severity: 'error' });
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

  const renderDocuments = () => (
    <div className="mb-4">
      <Typography variant="subtitle1">Documents</Typography>
      <List>
        {editedContact.documents?.map((doc, index) => (
          <ListItem key={index} className="flex justify-between items-center">
            <ListItemText
              primary={
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileAction(doc.url, doc.name, 'view');
                  }}
                  className="text-blue-600 hover:underline"
                >
                  {doc.name}
                </a>
              }
              secondary={doc.label}
            />
            <Button onClick={() => handleFileAction(doc.url, doc.name, 'download')}>
              Download
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Paper elevation={3} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" className="mb-4 pr-10">Client Details</Typography>
        <div className="space-y-4">
          {renderEditableField('firstName', 'First Name')}
          {renderEditableField('lastName', 'Last Name')}
          {renderEditableField('email', 'Email')}
          {renderEditableField('address', 'Address')}
          {renderEditableField('phoneNumber', 'Phone Number')}
          {renderEditableField('altPhone', 'Alternative Phone')}
          {renderLabels()}
          {renderEditableField('notes', 'Notes')}
          {renderDocuments()}
          <FileUpload contactId={contact._id!} onFileUploaded={handleFileUploaded} docId={''} />        </div>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default ClientDetailView;