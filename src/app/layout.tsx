//  src > app > layout.tsx

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