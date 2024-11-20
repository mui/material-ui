'use client';
import * as React from 'react';
import { useTheme } from './ThemeProvider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

const App = ({ className, ...other }: React.PropsWithChildren<{ className?: string }>) => {
  const { theme } = useTheme();
  return <body {...other} className={`${roboto.variable} ${theme}`} />;
};

export default App;
