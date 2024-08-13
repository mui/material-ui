import * as React from 'react';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material-pigment-css/Container';
import Grid from '@mui/material-pigment-css/Grid';
import Stack from '@mui/material-pigment-css/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material-pigment-css';

const Title = styled('div')(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  font: theme.vars.font.body1,
  fontSize: '1.125rem',
  lineHeight: 1.7,
}));

export default function Home() {
  return (
    <main sx={{ minHeight: '100lvh', display: 'grid', placeItems: 'center' }}>
      <DefaultPropsProvider
        value={{
          MuiChip: {
            label: 'Available in v6',
          },
        }}
      >
        <CssBaseline />
        <Container>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ pl: 4.5 }}>
              <Chip
                sx={(theme) => ({
                  mb: 2,
                  fontWeight: 600,
                  bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`,
                  color: 'primary.dark',
                })}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 500,
                  fontSize: 'clamp(3rem, 2.354rem + 2.7562vw, 5rem)',
                  textWrap: 'balance',
                  letterSpacing: '-0.025em',
                }}
              >
                <span
                  sx={(theme) => ({
                    display: 'block',
                    background: `linear-gradient(145deg, ${
                      (theme.vars || theme).palette.primary.light
                    } 5%, ${(theme.vars || theme).palette.primary.dark} 90%)`,
                    // `Webkit` has to come later
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  })}
                >
                  Material UI
                </span>
                Pigment CSS
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                component="ul"
                spacing={3}
                sx={{
                  m: 0,
                  pl: 3,
                  color: 'text.secondary',
                  '& li': {
                    pl: 2,
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    '&::marker': {
                      color: 'text.primary',
                    },
                  },
                }}
              >
                <li
                  sx={{
                    '&::marker': { content: '"⚡️"' },
                  }}
                >
                  <Title>Build-time CSS Extraction</Title>
                  <Typography>
                    Pigment CSS looks through Material UI components used in the project and
                    extracts the styles into plain CSS.
                  </Typography>
                </li>
                <li
                  sx={{
                    '&::marker': { content: '"🚀"' },
                  }}
                >
                  <Title>React Server Components</Title>
                  <Typography>
                    Material UI provides a set of layout components that integrate with Pigment CSS
                    to support React Server Components.
                  </Typography>
                </li>
                <li
                  sx={{
                    '&::marker': { content: '"📦"' },
                  }}
                >
                  <Title>Emotionless</Title>
                  <Typography>
                    Replacing Emotion with Pigment CSS eliminates ~15kB from the final bundle.
                  </Typography>
                </li>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </DefaultPropsProvider>
    </main>
  );
}
