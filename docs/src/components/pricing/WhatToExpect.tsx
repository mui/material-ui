import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Icon = ({ name }: { name: string }) => (
  <Box sx={{ display: 'inline-block', verticalAlign: 'bottom', mr: 1, lineHeight: 0 }}>
    <img
      width="28"
      height="28"
      loading="lazy"
      src={`/static/branding/pricing/${name}.svg`}
      alt=""
    />
  </Box>
);

export default function WhatToExpect() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h2"
        sx={{ maxWidth: { xs: 280, sm: 320, md: 400 }, mb: { xs: 2, sm: 4 } }}
      >
        What to expect from our available plans
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
              <Icon name="volume-discount" />
              Volumn discount
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The licenses are on a per-developer basis. We offer the following tiered discounts
              from list prices when purchasing more than one license for your development team:
              <Box component="ul" sx={{ px: 2.5 }}>
                <li>2-5 Licenses: 10% discount</li>
                <li>6-10 Licenses: 15% discount</li>
                <li>11+: License capped, extra developers do not need to be licensed.</li>
              </Box>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
              <Icon name="perpetual" />
              Perpetual license
            </Typography>
            <Typography variant="body2" color="text.secondary">
              With your purchase you are granted a license to use a version of the product in
              perpetuity. There are no further charges unless you choose to renew support and
              maintenance to cover newer versions. Please note that while the use of the software is
              perpetual, support and maintenance are not. We roll bug fixes, performance
              enhancements, and other improvements into new releases; we don&apos;t patch, fix, or
              in any way alter older versions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
              <Icon name="renewal" />
              Renewal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you wish to be able to update to the latest versions and access support after the
              end of your support period, you have the option to renew support and maintenance.
              Renewal is priced at 50% off the first-year license cost.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
              <Icon name="support-maintenance" />
              Support and maintenance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              With your purchase you receive support and maintenance for one year. After this time,
              you can continue to use your licensed versions in perpetuity, but will no longer be
              able to update to the latest version.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
