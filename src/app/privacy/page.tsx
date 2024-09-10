// src/app/privacy/page.tsx

import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          1. Information We Collect: NextFresh CRM collects information you provide directly to us when you create an account, use our Service, or communicate with us. This may include your name, email address, and any other information you choose to provide.
        </Typography>
        <Typography variant="body1" paragraph>
          2. How We Use Your Information: We use the information we collect to:
          - Provide, maintain, and improve our Service
          - Communicate with you about our Service
          - Monitor and analyze trends, usage, and activities in connection with our Service
        </Typography>
        <Typography variant="body1" paragraph>
          3. Information Sharing and Disclosure: We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.
        </Typography>
        <Typography variant="body1" paragraph>
          4. Data Security: We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
        </Typography>
        <Typography variant="body1" paragraph>
          5. Your Rights: You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly.
        </Typography>
        <Typography variant="body1" paragraph>
          6. Changes to This Policy: We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Typography>
        <Typography variant="body1">
          7. Contact Us: If you have any questions about this Privacy Policy, please contact us at privacy@nextfreshcrm.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;