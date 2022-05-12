import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export default function WhatToExpect() {
  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        <Grid item xs={6}>
          <Typography variant="h2">What to expect from our available plans</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
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
                With your purchase, you are granted a license to use a version of the product
                forever in a production environment. There are no further charges unless you choose
                to renew support and maintenance to cover newer versions. Please note that while the
                use of the software is perpetual in production, it&apos;s not perpetual for
                development, so if you&apos;d like to keep making changes to your product,
                you&apos;ll need to renew your license. We roll bug fixes, performance enhancements,
                and other improvements into new releases; we don&apos;t patch, fix, or in any way
                alter older versions.
              </Typography>
            </Paper>
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
                With your purchase, you receive support and maintenance for one year. After this
                time, you can continue to use your licensed versions in production, but will no
                longer be licensed to use the product in development, for instance, to release bug
                fixes.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
