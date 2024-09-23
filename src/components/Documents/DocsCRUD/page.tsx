// src/components/Documents/DocsCRUD/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Alert, Box, Typography, Button } from '@mui/material';
import DocForm from '../DocsForm/page';
import DocList from '../DocsList/page';
import { Doc } from '@/types/doc';

const DocsCRUD: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/docs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched docs:', data); // Add this line
      setDocs(data);
      setFilteredDocs(data);
    } catch (error) {
      console.error('Error fetching docs:', error);
      setError('Failed to fetch documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterDocs = useCallback(() => {
    const filtered = docs.filter(doc => {
      const docTitle = doc.doc_title || '';
      const docNotes = doc.notes || '';
      const docLabels = doc.labels || [];

      return (
        docTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docLabels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredDocs(filtered);
  }, [docs, searchTerm]);

  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    filterDocs();
  }, [filterDocs]);

  const handleDocCreated = async (newDoc: Doc) => {
    try {
      const response = await fetch('/api/docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(newDoc),
      });
      if (!response.ok) {
        throw new Error('Failed to create document');
      }
      const createdDoc = await response.json();
      setDocs(prevDocs => [createdDoc, ...prevDocs]);
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating document:', error);
      setError('Failed to create document. Please try again.');
    }
  };

  const handleDocUpdated = async (updatedDoc: Doc) => {
    try {
      const response = await fetch(`/api/docs?id=${updatedDoc._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoc),
      });
      if (!response.ok) {
        throw new Error('Failed to update document');
      }
      const updated = await response.json();
      setDocs(prevDocs =>
        prevDocs.map(doc => doc._id === updated._id ? updated : doc)
      );
      setSelectedDoc(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating document:', error);
      setError('Failed to update document. Please try again.');
    }
  };

  const handleDocDeleted = async (deletedDocId: string) => {
    try {
      const response = await fetch(`/api/docs?id=${deletedDocId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
      setDocs(prevDocs => prevDocs.filter(doc => doc._id !== deletedDocId));
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Failed to delete document. Please try again.');
    }
  };

  const handleViewDoc = async (doc: Doc, documentIndex: number) => {
    try {
      const response = await fetch(`/api/docs?id=${doc._id}&action=view&index=${documentIndex}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch document content');
      }
      const { viewUrl } = await response.json();
      window.open(viewUrl, '_blank');
    } catch (error) {
      console.error('Error fetching document content:', error);
      setError('Failed to load document content. Please try again.');
    }
  };

  const handleDownloadDoc = async (doc: Doc, documentIndex: number) => {
    try {
      const response = await fetch(`/api/docs?id=${doc._id}&action=download&index=${documentIndex}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch document download link');
      }
      const { downloadUrl } = await response.json();
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Failed to download document. Please try again.');
    }
  };

  const handleEditDoc = (doc: Doc) => {
    setSelectedDoc(doc);
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Document Management</Typography>
      
      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {isEditing ? (
        <DocForm
          selectedDoc={selectedDoc}
          onDocCreated={handleDocCreated}
          onDocUpdated={handleDocUpdated}
        />
      ) : (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setIsEditing(true)}
          className="mb-4"
        >
          Create New Document
        </Button>
      )}

      <TextField
        label="Search Documents"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <DocList
          docs={filteredDocs}
          onEditDoc={handleEditDoc}
          onDeleteDoc={handleDocDeleted}
          onViewDoc={handleViewDoc}
          onDownloadDoc={handleDownloadDoc}
        />
      )}
    </div>
  );
};

export default DocsCRUD;