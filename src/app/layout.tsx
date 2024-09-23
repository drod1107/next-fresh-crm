// src/app/layout.tsx

import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import Script from 'next/script';

export const metadata = {
  id: 'umami-script',
  title: 'NextFresh CRM',
  description: 'A modern CRM solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        id="umami-script"
        dangerouslySetInnerHTML={{
          __html: `
            <script
              async
              strategy="beforeInteractive"
              data-website-id="6259ab30-70a8-401d-9be4-d91684bb3c13"
              src="https://umami-windrose.vercel.app/script.js"
            ></script>
          `,
        }}
      />

      <body>
        <ClerkProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </ClerkProvider>
      </body>

    </html>
  );
}