import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "CRM App",
  description: "Custom CRM application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-lato bg-tertiary">
        <ThemeProvider theme={theme}>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}