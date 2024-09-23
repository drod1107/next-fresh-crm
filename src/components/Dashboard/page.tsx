import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your NextFresh CRM Dashboard. Here you can view an overview of your contacts and documents.
      </Typography>
      {/* Add more dashboard content here */}
    </Container>
  );
};

export default Dashboard;