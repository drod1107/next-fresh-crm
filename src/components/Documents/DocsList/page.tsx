// src/components/Documents/DocList/page.tsx

import React from 'react';
import { List, ListItem, Button } from '@mui/material';
import DocCard from './DocCard/page';
import { Doc } from '@/types/doc';

interface DocListProps {
  docs: Doc[];
  onEditDoc: (doc: Doc) => void;
  onDeleteDoc: (id: string) => void;
  onViewDoc: (doc: Doc) => void;
}

const DocList: React.FC<DocListProps> = ({ docs, onEditDoc, onDeleteDoc, onViewDoc }) => {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/docs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to delete doc');
      onDeleteDoc(id);
    } catch (error) {
      console.error('Error deleting doc:', error);
    }
  };

  return (
    <List>
      {docs.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        docs.map((doc) => (
          <ListItem key={doc._id} className="mb-4 flex flex-col items-stretch">
            <DocCard doc={doc} />
            <div className="mt-2 flex justify-end">
              <Button onClick={() => onViewDoc(doc)} className="mr-2">
                View
              </Button>
              <Button onClick={() => onEditDoc(doc)} className="mr-2">
                Edit
              </Button>
              <Button onClick={() => handleDelete(doc._id)} color="error">
                Delete
              </Button>
            </div>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default DocList;