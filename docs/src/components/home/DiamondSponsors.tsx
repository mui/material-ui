import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddRounded from '@material-ui/icons/AddRounded';
import Link from 'docs/src/modules/components/Link';
import SponsorCard, { SponsorLabel } from 'docs/src/components/home/SponsorCard';

const DIAMONDs = [
  {
    src: 'https://avatars3.githubusercontent.com/u/1287123?s=40',
    srcSet: 'https://avatars3.githubusercontent.com/u/1287123?s=80 2x',
    name: 'Octopus Deploy',
    description: 'Repetable relayable deployments.',
    href: 'https://octopus.com/',
  },
  {
    src: 'https://avatars3.githubusercontent.com/u/8424863?s=40',
    srcSet: 'https://avatars3.githubusercontent.com/u/8424863?s=80 2x',
    name: 'Doit International',
    description: 'Management platform for Google Clound and AWS.',
    href: 'https://www.doit-intl.com/',
  },
];

export default function DiamondSponsors() {
  return (
    <Box>
      <Box sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
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
                ? theme.palette.primary[200]
                : theme.palette.primary[500],
            border: '3px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[500]
                : theme.palette.primary[100],
          }}
        />
        <Typography
          component="h3"
          variant="h5"
          fontWeight="extraBold"
          sx={{color: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary[400]
              : theme.palette.primary[500],}}>
          Diamond
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
            {DIAMONDs.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={4}>
                <SponsorCard
                  inView
                  item={item}
                  bottom={<SponsorLabel color="primary">Diamond sponsor</SponsorLabel>}
                />
              </Grid>
            ))}
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
                  sx={{ mr: 2, border: '1px solid', borderColor: 'divider' }}
                >
                  <AddRounded />
                </IconButton>
                <Box>
                  <Typography variant="body2" color="text.primary" fontWeight="bold">
                    Become our sponsor!
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    To join us, contact us at{' '}
                    <Link href="mailto:diamond@mui.com" target="_blank" rel="noopener noreferrer">
                      diamond@mui.com
                    </Link>{' '}
                    for pre-approval.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
    </Box>
  );
}
