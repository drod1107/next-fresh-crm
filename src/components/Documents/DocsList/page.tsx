// src/components/Documents/DocsList/page.tsx

import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Chip, Box } from '@mui/material';
import { Doc } from '@/types/doc';

interface DocListProps {
  docs: Doc[];
  onEditDoc: (doc: Doc) => void;
  onDeleteDoc: (docId: string) => void;
  onViewDoc: (doc: Doc, documentIndex: number) => void;
  onDownloadDoc: (doc: Doc, documentIndex: number) => void;
}

const DocList: React.FC<DocListProps> = ({ docs, onEditDoc, onDeleteDoc, onViewDoc, onDownloadDoc }) => {
  console.log('DocList received docs:', docs);
  if (!docs || docs.length === 0) {
    return <Typography variant="body1">No documents found.</Typography>;
  }

  return (
    <List>
      {docs.map((doc) => (
        <ListItem key={doc._id} alignItems="flex-start" divider>
          <Box width="100%">
            <ListItemText
              primary={doc.doc_title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {doc.pb_username} - {doc.pb_email}
                  </Typography>
                  <Typography component="p" variant="body2">
                    {doc.notes}
                  </Typography>
                </>
              }
            />
            <Box mt={1} mb={1}>
              {doc.labels.map((label, index) => (
                <Chip key={index} label={label} size="small" style={{ marginRight: 4, marginBottom: 4 }} />
              ))}
            </Box>
            <Box mt={2}>
              <Button onClick={() => onEditDoc(doc)} color="primary" variant="outlined" style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Button onClick={() => doc._id && onDeleteDoc(doc._id)} color="secondary" variant="outlined">
                Delete
              </Button>
            </Box>
            {doc.documents && doc.documents.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2">Attached Documents:</Typography>
                {doc.documents.map((document, index) => (
                  <Box key={index} mt={1}>
                    <Typography variant="body2">{document.name} ({document.label})</Typography>
                    <Button
                      onClick={() => onViewDoc(doc, index)}
                      color="primary"
                      size="small"
                      style={{ marginRight: 8 }}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => onDownloadDoc(doc, index)}
                      color="primary"
                      size="small"
                    >
                      Download
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default DocList;