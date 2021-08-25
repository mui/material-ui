import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function EarlyBird() {
  return (
    <Container sx={{ pt: 2, pb: { xs: 2, sm: 4, md: 8 } }}>
      <Box
        sx={{
          borderRadius: 1,
          p: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.500' : 'primary.100',
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
        <div>
          <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
            🐦&nbsp;&nbsp;Early bird special!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
            Buy now at a reduced price (~25% off), and get early access to MUI X, with the added
            opportunity to influence its development. This perpetual license gives access to support
            and updates for one year. The early bird special is available for a limited time, so
            don&apos;t miss this opportunity!
          </Typography>
        </div>
      </Box>
    </Container>
  );
}
