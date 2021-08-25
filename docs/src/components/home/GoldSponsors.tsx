import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SponsorCard from 'docs/src/components/home/SponsorCard';

const GOLDs = [
  {
    src: 'https://avatars.githubusercontent.com/u/30204434?s=40',
    srcSet: 'https://avatars.githubusercontent.com/u/30204434?s=80 2x',
    name: 'Tidelift',
    description: 'Enterprise-ready open source software.',
    href: 'https://tidelift.com/',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/24789812?size=40',
    srcSet: 'https://avatars.githubusercontent.com/u/24789812?size=80 2x',
    name: 'Bit',
    description: 'The fastest way to share code.',
    href: 'https://bit.dev/',
  },
  {
    src: 'https://images.opencollective.com/callemall/a6946da/logo/40.png',
    srcSet: 'https://images.opencollective.com/callemall/a6946da/logo/80.png 2x',
    name: 'Text-em-all',
    description: 'The easy way to message your group.',
    href: 'https://www.text-em-all.com/',
  },
  {
    src: 'https://images.opencollective.com/canadacasino/5b19004/logo/40.png',
    srcSet: 'https://images.opencollective.com/canadacasino/5b19004/logo/80.png 2x',
    name: 'Canada Casino',
    description: 'Safe and rewarding online casino experience',
    href: 'https://casinocanada.com/',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/13365608?s=40',
    srcSet: 'https://avatars.githubusercontent.com/u/13365608?s=80 2x',
    name: 'Spice Factory',
    description: 'Next gen digital product studio.',
    href: 'https://spicefactory.co/',
  },
  {
    src: '/static/sponsors/elevator-logo.png',
    srcSet: '/static/sponsors/elevator-logo-2x.png 2x',
    name: 'Elevator',
    description: 'The dopest new hip hop, upcoming artsits, music.',
    href: 'https://www.elevatormag.com/',
  },
  {
    src: 'https://images.opencollective.com/movavi-software/a1d0167/logo/40.png',
    srcSet: 'https://images.opencollective.com/movavi-software/a1d0167/logo/80.png 2x',
    name: 'Movavi',
    description: 'Screen recorder for Mac.',
    href: 'https://www.movavi.com/',
  },
  {
    src: '/static/sponsors/hoodie-bees.png',
    srcSet: '/static/sponsors/hoodie-bees-2x.png',
    name: 'Hoodie Bees',
    description: 'Horse community.',
    href: 'https://www.hoodiebees.com/',
  },
];

export default function GoldSponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Box ref={ref}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'inline-block',
            mr: 1,
            mt: 0.5,
            borderRadius: 1,
            width: 12,
            height: 12,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.warning[200]
                : theme.palette.warning[800],
            border: '3px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.warning[800]
                : theme.palette.warning[300],
          }}
        />
        <Typography
          component="h3"
          variant="h5"
          fontWeight="extraBold"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.warning[500]
                : theme.palette.warning[800],
          }}
        >
          Gold
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {GOLDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <SponsorCard inView={inView} item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
