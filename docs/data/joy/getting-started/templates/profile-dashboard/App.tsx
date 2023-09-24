import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfile from './components/MyProfile';

type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

export default function JoyOrderDashboardTemplate({
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
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            '--main-paddingTop': {
              xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
              md: '32px',
            },
            pt: 'var(--main-paddingTop)',
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          })}
        >
          <MyProfile />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
