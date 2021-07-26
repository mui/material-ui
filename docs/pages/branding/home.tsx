import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppHeader from 'docs/src/layouts/AppHeader';
import Container from '@material-ui/core/Container';
import brandingTheme from 'docs/src/modules/brandingTheme';
import Hero from 'docs/src/components/home/Hero';
import References from 'docs/src/components/home/References';
import DesignSystems from 'docs/src/components/home/DesignSystems';

export default function Home() {
  return (
    <ThemeProvider theme={brandingTheme}>
      <CssBaseline />
      <AppHeader />
      <Hero />
      <Container sx={{ py: 8 }}>
        <References />
        <Typography color="grey.600" maxWidth={360} textAlign="center" mx="auto" mt={4}>
          {"From startups to Fortune 500s, the world's best product teams leverage "}
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
            MUI
          </Box>{' '}
          to build their UIs.
        </Typography>
      </Container>
      <DesignSystems />
    </ThemeProvider>
  );
}
