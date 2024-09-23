// src/components/Header/Header.tsx

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Navbar />
      <Box sx={{ position: 'absolute', right: '20px', top: '10px' }}>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Box>
    </Box>
  );
};

export default Header;