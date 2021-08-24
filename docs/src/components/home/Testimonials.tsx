import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';

const UserFeedbacks = dynamic(() => import('./UserFeedbacks'));

const data = [
  { title: '2.3M', metadata: 'Weekly downloads on npm' },
  { title: '70.2k', metadata: 'Stars on GitHub' },
  { title: '2.2k', metadata: 'Open-source contributors' },
  { title: '14.1k', metadata: 'Followers on Twitter' },
];

export function MuiStats() {
  return (
    <Grid item xs={12} md={6} container spacing={2}>
      {data.map((item) => (
        <Grid key={item.title} item xs={6}>
          <Box
            sx={{
              height: '100%',
              p: 1,
              pl: 2,
              borderLeft: '4px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'primary.100',
            }}
          >
            <Typography
              component="div"
              variant="h3"
              color={(theme) => (theme.palette.mode === 'dark' ? 'primary.200' : 'primary.main')}
              fontWeight="bold"
            >
              {item.title}
            </Typography>
            <Typography
              color={(theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800')}
            >
              {item.metadata}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <Box ref={ref} sx={{ bgcolor: 'primaryDark.700' }}>
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} sx={{ zIndex: 1, minHeight: { xs: 400, sm: 307, lg: 355 } }}>
              {inView && <UserFeedbacks />}
            </Grid>
            <MuiStats />
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Testimonials;
