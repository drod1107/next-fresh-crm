// src > app > page.tsx

import React from 'react';
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button, Typography, Container, Box } from '@mui/material';
import ContactCRUD from '../components/Contacts/ContactCRUD/page';

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h2" gutterBottom>
            Welcome to NextFresh CRM
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            The lightest, fastest, simplest CRM built on NextJS and MongoDB Atlas
          </Typography>
          <SignUpButton mode="modal">
            <Button variant="contained" size="large" sx={{ mt: 3 }}>
              Sign Up to Get Started
            </Button>
          </SignUpButton>
        </Box>
      </Container>
    );
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h1>NextFresh CRM Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main>
        <ContactCRUD />
      </main>
    </div>
  );
}