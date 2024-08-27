// src > theme.ts

'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#074bae',  // Tailwind's primary color
    },
    secondary: {
      main: '#c66be4',  // Tailwind's secondary color
    },
    background: {
      default: '#f7f7f7',  // Tailwind's tertiary color
    },
    text: {
      primary: '#074bae',
      secondary: '#c66be4',
    },
  },
  typography: {
    fontFamily: 'Lato, Hind, sans-serif',  // Tailwind's fonts
  },
});

export default theme;
