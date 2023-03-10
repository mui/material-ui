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
        Key information about the paid plans
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
              You can use the software in a production environment forever. Any version of the
              software released prior to the end of your subscription are available in perpetuity.
              There are no further charges unless you choose to continue development. See the
              &quot;Development license&quot; section for more details.
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
              The licenses are sold on a per front-end developer basis. The Pro plan includes is
              capped at 10 licenses; you do not need to pay for additional licenses for more than 10
              developers. You can contact <Link href="mailto:sales@mui.com">sales</Link> for a
              volume discount when licensing over 25 developers under the Premium plan.
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
                Maintenance and support
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              With your purchase you receive support and access to new versions for the duration of
              your subscription. You can{' '}
              <Link href="https://mui.com/x/introduction/support/#technical-support">
                learn more about support
              </Link>{' '}
              in the docs. Note that, except for critical issues, such as security flaws, we release
              bug fixes and other improvements on top of the latest version, instead of patching
              older versions.
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
              software need an active license. You will need to renew your subscription if you wish
              to continue active development after your subscription ends.
              <br />
              {`You don't need to renew your license if you have stopped active development with MUI X Pro or Premium. You
              can learn more about this in `}
              <Link
                target="_blank"
                rel="noopener"
                href="https://mui.com/legal/mui-x-eula/#perpetual-in-production"
              >
                the EULA
              </Link>
              .
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
