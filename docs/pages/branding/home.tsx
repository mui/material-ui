import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppHeader from 'docs/src/layouts/AppHeader';
import Container from '@material-ui/core/Container';
import Hero from 'docs/src/components/home/Hero';
import brandingTheme from 'docs/src/modules/brandingTheme';
import References from 'docs/src/components/home/References';

export default function Home() {
  return (
    <ThemeProvider theme={brandingTheme}>
      <CssBaseline />
      <AppHeader />
      <Hero />
      <Container sx={{ py: 8 }}>
        <References />
        <Typography
          variant="body2"
          color="grey.800"
          textAlign="center"
          sx={{ mt: 4, mx: 'auto', maxWidth: 360 }}
        >
          From startups to Fortune 500s, the world&apos;s best teams leverage MUI to build their
          UIs.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
