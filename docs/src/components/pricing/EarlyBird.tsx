import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'docs/src/modules/components/Link';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export default function EarlyBird() {
  return (
    <Container
      sx={{
        pt: 2,
        pb: { xs: 2, sm: 4, md: 8 },
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      }}
      id="early-bird"
    >
      <Stack
        sx={(theme) => ({
          borderRadius: 1,
          p: 2,
          bgcolor: 'primary.50',
          border: '1px solid',
          borderColor: 'primary.100',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.500',
          }),
        })}
      >
        <Box>
          <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
            🐦&nbsp;&nbsp;Early bird special!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
            Buy now at a reduced price (~25% off), and get early access to MUI X Premium, with the
            added opportunity to influence its development. The early bird special is available for
            a limited time, so don&apos;t miss this opportunity!
          </Typography>
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href="https://mui.com/store/items/mui-x-premium/"
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{
            py: 1,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 3, sm: 0 },
            width: { xs: '100%', sm: '50%', md: '15%' },
          }}
        >
          Buy now
        </Button>
      </Stack>
    </Container>
  );
}
