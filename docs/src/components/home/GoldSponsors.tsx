import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import Grid from '@mui/material/Grid';
import SponsorCard from 'docs/src/components/home/SponsorCard';
import BacklinkSponsor from 'docs/src/components/home/BacklinkSponsor';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';

const GOLDs = [
  {
    src: '/static/sponsors/tidelift.svg',
    name: 'Tidelift',
    description: 'Enterprise-ready open-source software.',
    href: 'https://tidelift.com/?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/1262264?size=40',
    srcSet: 'https://avatars.githubusercontent.com/u/1262264?s=120 3x',
    name: 'Text-em-all',
    description: 'Mass text messaging and automated calling.',
    href: 'https://www.text-em-all.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://images.opencollective.com/dialmycalls/f5ae9ab/avatar/40.png',
    srcSet: 'https://images.opencollective.com/dialmycalls/f5ae9ab/avatar/120.png 3x',
    name: 'DialMyCalls',
    description: 'Send text messages, calls, and emails.',
    href: 'https://www.dialmycalls.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
];
const BACKLINKs = [
  {
    name: 'Goread.io',
    description: 'Instagram followers, likes, views, and comments.',
    href: 'https://goread.io/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    name: 'Buzzoid',
    description: 'Instant delivery Instagram followers.',
    href: 'https://buzzoid.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    name: 'Twicsy',
    description: 'Instant delivery Instagram followers.',
    href: 'https://twicsy.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    name: 'Views4You',
    description: 'Social media growth services.',
    href: 'https://views4you.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    name: 'Poprey',
    description: 'Buy Instagram likes with crypto.',
    href: 'https://poprey.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
  {
    name: 'SocialWick',
    description: 'Buy Instagram followers.',
    href: 'https://www.socialwick.com/instagram/followers',
  },
  {
    name: 'Follower24',
    description: 'Social media success.',
    href: 'https://www.follower24.de/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
];

export default function GoldSponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <div ref={ref}>
      <Typography
        component="h3"
        variant="h6"
        sx={[
          {
            fontWeight: 'semiBold',
          },
          (theme) => ({
            mt: 4,
            mb: 1.5,
            background: `linear-gradient(90deg, ${(theme.vars || theme).palette.warning[500]} 50%, ${
              (theme.vars || theme).palette.warning[700]
            } 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            ...theme.applyDarkStyles({
              background: `linear-gradient(90deg, ${
                (theme.vars || theme).palette.warning[400]
              } 50%, ${(theme.vars || theme).palette.warning[700]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }),
          }),
        ]}
      >
        Gold
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {GOLDs.map((item) => (
          <Grid key={item.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <SponsorCard inView={inView} item={item} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderStyle: 'dashed',
            }}
          >
            <IconButton
              aria-label="Sponsor MUI"
              component="a"
              href={ROUTES.goldSponsor}
              target="_blank"
              rel="noopener"
              color="primary"
            >
              <AddRounded />
            </IconButton>
            <div>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                Become a sponsor
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Find out how{' '}
                <Link href={ROUTES.goldSponsor} target="_blank" rel="noopener">
                  you can support MUI.
                </Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div>
        {BACKLINKs.map((item) => (
          <BacklinkSponsor key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
