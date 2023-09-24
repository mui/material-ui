import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyMessages from './components/MyMessages';

type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

export default function JoyMessagesTemplate({
  disableCssReset = false,
  ...props
}: {
  disableCssReset?: boolean;
} & PropsOf<typeof CssVarsProvider>) {
  return (
    <CssVarsProvider disableTransitionOnChange {...props}>
      {!disableCssReset && <CssBaseline />}
      <Box
        sx={{
          '--screen-height': '100dvh',
          display: 'flex',
          height: 'var(--screen-height)',
        }}
      >
        <Header />
        <Sidebar />
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
