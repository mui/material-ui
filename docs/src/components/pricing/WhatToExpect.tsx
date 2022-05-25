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
import Link from 'docs/src/modules/components/Link';

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
              With your purchase, you are granted a license to use a version of the product forever
              in a production environment. There are no further charges unless you choose to
              continue development.
            </Typography>
          </Paper>
        </Grid>
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
                Volume discount
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              The licenses are sold on a per-developer basis. The Pro plan includes a cap at 10
              developers, extra developers do not need to be licensed. You can contact{' '}
              <Link href="mailto:sales@mui.com">sales</Link> for a volume discount when licensing
              over 50 developers under the Premium plan.
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
                Development license
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Developers contributing changes to the front-end code of a project that include the
              software <strong>always</strong> need an active license. So if you wish to continue
              active development using the software after the end of your subscription, you will
              need to renew your subscription. You can learn more about it in{' '}
              <Link href="https://mui.com/store/legal/mui-x-eula/">the EULA</Link>.
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
              With your purchase, you receive support and access to new versions for the duration of
              your subscription. You can learn more about{' '}
              <Link href="https://mui.com/x/advanced-components/#support">support in our docs</Link>
              .
              <br />
              Note that we roll bug fixes, performance enhancements, and other improvements into new
              releases, on the latest release line.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
