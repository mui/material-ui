import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material-pigment-css/Container';
import Grid from '@mui/material-pigment-css/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export default function Home() {
  return (
    <main sx={{ minHeight: '100lvh', display: 'grid', placeItems: 'center' }}>
      <CssBaseline />
      <Container>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="Available in v6"
              color="primary"
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
            <ul
              sx={{
                m: 0,
                pl: 3,
                color: 'text.secondary',
                '& li': {
                  pl: 2,
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  '&:not(:first-child)': {
                    marginTop: 2,
                  },
                  '&::marker': {
                    color: 'text.primary',
                  },
                  '& > div': {
                    color: 'text.primary',
                    fontSize: '1.5rem',
                    lineHeight: 1.7,
                  },
                },
              }}
            >
              <li
                sx={{
                  '&::marker': { content: '"⚡️"' },
                }}
              >
                <Typography component="div">Build-time CSS Extraction</Typography>
                <Typography>
                  Pigment CSS will look through Material UI components used in the project and
                  extract the styles into plain CSS.
                </Typography>
              </li>
              <li
                sx={{
                  '&::marker': { content: '"🚀"' },
                }}
              >
                <Typography component="div">React Server Components</Typography>
                <Typography>
                  Material UI provides a separate set of layout components that integrated with
                  Pigment CSS to support React Server Components.
                </Typography>
              </li>
              <li
                sx={{
                  '&::marker': { content: '"📦"' },
                }}
              >
                <Typography component="div" variant="subtitle1">
                  Emotionless
                </Typography>
                <Typography>Emotion will be removed from the final bundle, saved ~15kB.</Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
