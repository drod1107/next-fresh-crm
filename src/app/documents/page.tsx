// src/app/documents/page.tsx

import React from 'react';
import { Typography, Container } from '@mui/material';
import DocsCRUD from '../../components/Documents/DocsCRUD/page';

const Documents: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Documents
      </Typography>
      <DocsCRUD />
    </Container>
  );
};

export default Documents;