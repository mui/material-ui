import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function EarlyBird() {
  return (
    <Container sx={{ py: 4, pt: 0 }}>
      <Box
        sx={{
          borderRadius: 1,
          p: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.900' : 'primary.400',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
            Early bird special! 🐦
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
            Buy now at a reduced price (~25% off), and get early access to Material-UI X, with the
            added opportunity to influence its development. This perpetual license gives access to
            support and updates for one year. The early bird special is available for a limited
            time, so don&apos;t miss this opportunity!
          </Typography>
        </Box>
        <img width="130" height="124" src="/static/branding/pricing/early-bird.svg" alt="" />
      </Box>
    </Container>
  );
}
