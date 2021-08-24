import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AllInclusiveOutlinedIcon from '@material-ui/icons/AllInclusiveOutlined';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export default function WhatToExpect() {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography
        variant="h2"
        sx={{ maxWidth: { xs: 280, sm: 320, md: 400 }, mb: { xs: 2, sm: 4 } }}
      >
        What to expect from our available plans
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalOfferOutlinedIcon fontSize="small" color="primary" />
                  <Typography
                    fontWeight="bold"
                    component="h3"
                    color="text.primary"
                    variant="body2"
                    sx={{ ml: 1 }}
                  >
                    Volumn discount
                  </Typography>
              </Box>
            <Typography variant="body2" color="text.secondary">
              The licenses are on a per-developer basis. We offer the following tiered discounts
              from list prices when purchasing more than one license for your development team:
            </Typography>
            <Box component="ul" sx={{ px: 2.5, typography: 'body2', color: 'text.secondary' }}>
              <li>2-5 Licenses: 10% discount</li>
              <li>6-10 Licenses: 15% discount</li>
              <li>11+: License capped, extra developers do not need to be licensed.</li>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AllInclusiveOutlinedIcon fontSize="small" color="primary" />
                    <Typography
                      fontWeight="bold"
                      component="h3"
                      color="text.primary"
                      variant="body2"
                      sx={{ ml: 1 }}
                    >
                      Perpetual license
                    </Typography>
                </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ReplayRoundedIcon fontSize="small" color="primary" />
                    <Typography
                      fontWeight="bold"
                      component="h3"
                      color="text.primary"
                      variant="body2"
                      sx={{ ml: 1 }}
                    >
                      Renewal
                    </Typography>
                </Box>
            <Typography variant="body2" color="text.secondary">
              If you wish to be able to update to the latest versions and access support after the
              end of your support period, you have the option to renew support and maintenance.
              Renewal is priced at 50% off the first-year license cost.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <HelpOutlineOutlinedIcon fontSize="small" color="primary" />
                    <Typography
                      fontWeight="bold"
                      component="h3"
                      color="text.primary"
                      variant="body2"
                      sx={{ ml: 1 }}
                    >
                      Support and maintenance
                    </Typography>
                </Box>
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
