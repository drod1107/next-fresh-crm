// src/app/terms/page.tsx

import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const TermsOfService: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          1. Acceptance of Terms: By accessing and using NextFresh CRM (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          2. Description of Service: NextFresh CRM is a customer relationship management software as a service (SaaS) platform designed to help businesses manage their contacts and documents.
        </Typography>
        <Typography variant="body1" paragraph>
          3. User Accounts: To use the Service, you must create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </Typography>
        <Typography variant="body1" paragraph>
          4. User Data: You retain all rights to your data. By using the Service, you grant NextFresh CRM a license to host, store, and share your data as necessary to provide the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          5. Acceptable Use: You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          6. Termination: We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever.
        </Typography>
        <Typography variant="body1" paragraph>
          7. Changes to Terms: We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
        </Typography>
        <Typography variant="body1">
          8. Contact Us: If you have any questions about these Terms, please contact us at support@nextfreshcrm.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;