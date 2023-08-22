import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import Link from 'docs/src/modules/components/Link';
import SponsorCard from 'docs/src/components/home/SponsorCard';

const DIAMONDs = [
  {
    src: '/static/sponsors/octopus-square.svg',
    name: 'Octopus Deploy',
    description: 'A unified DevOps automation platform for your team.',
    href: 'https://octopus.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: '/static/sponsors/doit-square.svg',
    name: 'Doit International',
    description: 'Management platform for Google Cloud and AWS.',
    href: 'https://www.doit.com/flexsave/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
];

export default function DiamondSponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  const maxNumberOfDiamondSponsors = 3;
  const spotIsAvailable = maxNumberOfDiamondSponsors > DIAMONDs.length;
  return (
    <div ref={ref}>
      <Typography
        component="h3"
        variant="h6"
        fontWeight="bold"
        sx={(theme) => ({
          mt: 4,
          mb: 2,
          background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[400]} 50%, ${
            (theme.vars || theme).palette.primary[700]
          } 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
      >
        Diamond
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {DIAMONDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4}>
            <SponsorCard logoSize={64} inView={inView} item={item} />
          </Grid>
        ))}
        {spotIsAvailable && (
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                p: 2,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                borderStyle: 'dashed',
                borderColor: 'grey.300',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.400',
                }),
              })}
            >
              <IconButton
                aria-label="Become MUI sponsor"
                component="a"
                href="mailto:sales@mui.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={(theme) => ({
                  mr: 2,
                  border: '1px solid',
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.400',
                  }),
                })}
              >
                <AddRounded />
              </IconButton>
              <div>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  Become our sponsor!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To join us, contact us at{' '}
                  <Link href="mailto:sales@mui.com" target="_blank" rel="noopener noreferrer">
                    sales@mui.com
                  </Link>{' '}
                  for pre-approval.
                </Typography>
              </div>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
