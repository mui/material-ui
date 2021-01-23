import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'docs/src/modules/components/Link';

export default function BrandingBeginToday() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/static/branding/block5.png"
        loading="lazy"
        alt=""
        sx={{
          height: '100%',
          position: 'absolute',
          left: {
            md: -160,
            lg: 0,
          },
          display: {
            xs: 'none',
            md: 'block',
          },
          bottom: 0,
        }}
      />
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          py: { xs: 17, sm: 18, md: 16 },
        }}
      >
        <Box
          component="img"
          src="/static/branding/block1-blue.svg"
          loading="lazy"
          alt=""
          sx={{
            width: 293,
            height: 120,
            position: 'absolute',
            right: 0,
            top: 'calc(100% - 79px)',
            visibility: ['hidden', 'visible'],
          }}
        />
        <Typography variant="h2" align="center">
          Begin with Material-UI today
        </Typography>
        <Typography align="center" sx={{ mt: 2, mb: 4, fontSize: [16, 18] }}>
          Start with Material-UI and discover the benefits
        </Typography>
        <Button
          component={Link}
          noLinkStyle
          href="/getting-started/usage/"
          size="large"
          variant="contained"
          endIcon={<NavigateNextIcon />}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}
