import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

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
              <AllInclusiveOutlinedIcon fontSize="small" color="primary" />
              <Typography
                fontWeight="bold"
                component="h3"
                color="text.primary"
                variant="body2"
                sx={{ ml: 1 }}
              >
                Perpetual license in production
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              With your purchase, you are granted a license to use a version of the product forever in a production environment. 
              There are no further charges unless you choose to renew support and
              maintenance to cover newer versions. Please note that while the use of the software is
              perpetual in production, it's not perpetual for development, so if you'd like to keep making changes to your product, you'll need to renew your license.
              We roll bug fixes, performance enhancements, and other improvements into new releases; we don&apos;t patch, fix, or
              in any way alter older versions.
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
              With your purchase, you receive support and maintenance for one year.
              After this time, you can continue to use your licensed versions in production,
              but will no longer be licensed to update to newer versions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
