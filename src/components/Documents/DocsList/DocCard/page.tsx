// src/components/Documents/DocList/DocCard/page.tsx

import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Doc } from '@/types/doc';

interface DocCardProps {
  doc: Doc;
}

const DocsCard: React.FC<DocCardProps> = ({ doc }) => {
  return (
    <Card className="w-full">
      <CardContent>
        <Typography variant="h5" component="div" className="mb-2">
          {doc.doc_title}
        </Typography>
        <Typography color="text.secondary" className="mb-1">
          Email: {doc.pb_email}
        </Typography>
        {doc.labels && doc.labels.length > 0 && (
          <div className="mt-2">
            {doc.labels.map((label: string) => (
              <Chip key={label} label={label} size="small" className="mr-1 mb-1" />
            ))}
          </div>
        )}
        {doc.notes && (
          <Typography variant="body2" className="mt-2">
            Notes: {doc.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DocsCard;