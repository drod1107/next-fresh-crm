//  src > app > layout.tsx

import Script from "next/script";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        strategy="beforeInteractive"
        data-website-id="6259ab30-70a8-401d-9be4-d91684bb3c13"
        src="https://umami-windrose.vercel.app/script.js"
      />
      <body>
        <ClerkProvider afterSignOutUrl={"/"}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}