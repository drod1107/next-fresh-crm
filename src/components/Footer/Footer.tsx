// src/components/Footer/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        bgcolor: 'grey.200'  // Use a static color value instead of a function
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 Windrose & Company, All Rights Reserved
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="https://windrose.dev" target="_blank" rel="noopener noreferrer">
            Windrose.dev
          </Link>
          {' | '}
          <Link href="/terms">Terms of Service</Link>
          {' | '}
          <Link href="/privacy">Privacy Policy</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;