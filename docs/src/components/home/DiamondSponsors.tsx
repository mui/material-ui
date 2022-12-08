import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import Link from 'docs/src/modules/components/Link';
import SponsorCard from 'docs/src/components/home/SponsorCard';

const DIAMONDs = [
  {
    src: '/static/sponsors/octopus.svg',
    srcSet: '/static/sponsors/octopus.svg',
    name: 'Octopus Deploy',
    description: 'A unified DevOps automation platform for your team.',
    href: 'https://octopus.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: '/static/sponsors/doit-square.svg',
    srcSet: '/static/sponsors/doit-square.svg',
    name: 'Doit International',
    description: 'Management platform for Google Cloud and AWS.',
    href: 'https://www.doit-intl.com/flexsave/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://brand.zesty.io/zesty-io-logo.svg',
    srcSet: 'https://brand.zesty.io/zesty-io-logo.svg',
    name: 'Zesty.io',
    description: 'The only Next.js CMS you need.',
    href: 'https://www.zesty.io/integrations/mui-nextjs/?utm_source=mui&utm_medium=referral&utm_campaign=sponsor',
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
    <Box ref={ref}>
      <Box sx={{ mb: 1 }}>
        <Typography
          component="h3"
          variant="h5"
          fontWeight="extraBold"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[500],
          }}
        >
          Diamond
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {DIAMONDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4}>
            <SponsorCard logoSize={64} inView={inView} item={item} />
          </Grid>
        ))}
        {spotIsAvailable && (
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                borderStyle: 'dashed',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
              }}
            >
              <IconButton
                aria-label="Become MUI sponsor"
                component="a"
                href="mailto:diamond@mui.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{
                  mr: 2,
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
                }}
              >
                <AddRounded />
              </IconButton>
              <div>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  Become our sponsor!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To join us, contact us at{' '}
                  <Link href="mailto:diamond@mui.com" target="_blank" rel="noopener noreferrer">
                    diamond@mui.com
                  </Link>{' '}
                  for pre-approval.
                </Typography>
              </div>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
