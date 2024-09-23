// src/components/Documents/DocList/DocCard/page.tsx

import React from 'react';
import { Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { Doc } from '@/types/doc';

/**
 * Component to render a document card in the document list
 * @param doc - document data
 * @param onViewDoc - callback to view a document
 * @param onDownloadDoc - callback to download a document
 * @returns {JSX.Element} - document card component
 */
interface DocCardProps {
  doc: Doc;
  onViewDoc: (doc: Doc, documentIndex: number) => void;
  onDownloadDoc: (doc: Doc, documentIndex: number) => void;
}

/**
 * Component to render a document card in the document list
 * @param props - props for the component
 * @returns {JSX.Element} - document card component
 */
const DocsCard: React.FC<DocCardProps> = ({ doc, onViewDoc, onDownloadDoc }) => {
  return (
    <Card className="w-full">
      <CardContent>
        <Typography variant="h5" component="div" className="mb-2">
          {/* display document title */}
          {doc.doc_title}
        </Typography>
        <Typography color="text.secondary" className="mb-1">
          {/* display document email */}
          Email: {doc.pb_email}
        </Typography>
        {/* display document labels */}
        {doc.labels && doc.labels.length > 0 && (
          <div className="mt-2">
            {doc.labels.map((label: string) => (
              <Chip key={label} label={label} size="small" className="mr-1 mb-1" />
            ))}
          </div>
        )}
        {/* display document notes */}
        {doc.notes && (
          <Typography variant="body2" className="mt-2">
            Notes: {doc.notes}
          </Typography>
        )}
        {/* display document documents */}
        {doc.documents && doc.documents.length > 0 && (
          <div className="mt-4">
            <Typography variant="subtitle2">Attached Documents:</Typography>
            {doc.documents.map((document, index) => (
              <div key={index} className="mt-2">
                <Typography variant="body2">{document.name}</Typography>
                <Button 
                  onClick={() => onViewDoc(doc, index)} 
                  variant="outlined" 
                  size="small" 
                  className="mr-2"
                >
                  {/* button to view document */}
                  View
                </Button>
                <Button 
                  onClick={() => onDownloadDoc(doc, index)} 
                  variant="outlined" 
                  size="small"
                >
                  {/* button to download document */}
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocsCard;
