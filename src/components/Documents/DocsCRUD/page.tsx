// src/components/Documents/DocsCRUD/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Alert, Box, Modal, Typography, Button } from '@mui/material';
import DocForm from '../DocsForm/page';
import DocList from '../DocsList/page';
import { Doc } from '@/types/doc';

const DocsCRUD: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [viewedDoc, setViewedDoc] = useState<Doc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string | null>(null);
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
    const filtered = docs.filter(doc =>
      doc.doc_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocs(filtered);
  }, [docs, searchTerm]);

  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    filterDocs();
  }, [filterDocs]);

  const handleDocCreated = (newDoc: Doc) => {
    setDocs(prevDocs => [newDoc, ...prevDocs]);
    setIsEditing(false);
  };

  const handleDocUpdated = (updatedDoc: Doc) => {
    setDocs(prevDocs =>
      prevDocs.map(doc => doc._id === updatedDoc._id ? updatedDoc : doc)
    );
    setSelectedDoc(null);
    setIsEditing(false);
  };

  const handleDocDeleted = async (deletedDocId: string) => {
    try {
      const response = await fetch(`/api/docs/${deletedDocId}`, {
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

  const handleViewDoc = async (doc: Doc) => {
    setViewedDoc(doc);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/docs/${doc._id}/content`);
      if (!response.ok) {
        throw new Error('Failed to fetch document content');
      }
      const content = await response.text();
      setDocContent(content);
    } catch (error) {
      console.error('Error fetching document content:', error);
      setError('Failed to load document content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseViewer = () => {
    setViewedDoc(null);
    setDocContent(null);
  };

  const handleEditDoc = (doc: Doc) => {
    setSelectedDoc(doc);
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Document Management</h2>
      
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

      {loading && !viewedDoc ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <DocList
          docs={filteredDocs}
          onEditDoc={handleEditDoc}
          onDeleteDoc={handleDocDeleted}
          onViewDoc={handleViewDoc}
        />
      )}

      <Modal
        open={viewedDoc !== null}
        onClose={handleCloseViewer}
        aria-labelledby="doc-viewer-modal"
        aria-describedby="view-document-content"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          {viewedDoc && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {viewedDoc.doc_title}
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <pre className="whitespace-pre-wrap">{docContent}</pre>
              )}
              <Button onClick={handleCloseViewer} variant="contained" color="primary" className="mt-4">
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DocsCRUD;