import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function EarlyBird() {
  return (
    <Container sx={{ py: 8, pt: 2 }}>
      <Box
        sx={{
          borderRadius: 1,
          p: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.900' : 'primary.400',
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
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
        <Box sx={{
          mb: {
            xs: 2,
            sm: 0,
          },
        }}>
          <img width="110" height="104" src="/static/branding/pricing/early-bird.svg" alt="" />
        </Box>
      </Box>
    </Container>
  );
}
