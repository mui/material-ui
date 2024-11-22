'use client';
import * as React from 'react';
import { Roboto } from 'next/font/google';
import { useColorScheme } from './ColorSchemeProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

function App({ className, ...other }: React.PropsWithChildren<{ className?: string }>) {
  const { colorScheme } = useColorScheme();
  return <body {...other} className={`${roboto.variable} ${colorScheme}`} />;
}

export default App;
