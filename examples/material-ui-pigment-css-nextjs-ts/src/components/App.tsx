'use client';
import * as React from 'react';
import { useColorScheme } from './ColorSchemeProvider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

const App = ({ className, ...other }: React.PropsWithChildren<{ className?: string }>) => {
  const { colorScheme } = useColorScheme();
  return <body {...other} className={`${roboto.variable} ${colorScheme}`} />;
};

export default App;
