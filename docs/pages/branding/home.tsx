/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Hero from 'docs/src/components/home/Hero';
import References from 'docs/src/components/home/References';

import brandingTheme from 'docs/src/modules/brandingTheme';

export default function Home() {
  return (
    <ThemeProvider theme={brandingTheme}>
      <CssBaseline />
      <AppHeader />
      <Hero />
      <Container sx={{ py: 8 }}>
        <References />
        <Typography color="grey.600" maxWidth={360} textAlign="center" mx="auto" mt={4}>
          From startups to Fortune 500s, the world's best product teams leverage{' '}
          <Box component="span" color="primary.main">
            <b>MUI</b>
          </Box>{' '}
          to build their UIs.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
