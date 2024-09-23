// src/app/contacts/page.tsx

import React from 'react';
import { Typography, Container } from '@mui/material';
import ContactCRUD from '../../components/Contacts/ContactCRUD/page';

const Contacts: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Contacts
      </Typography>
      <ContactCRUD />
    </Container>
  );
};

export default Contacts;