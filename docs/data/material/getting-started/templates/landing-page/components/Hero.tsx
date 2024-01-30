import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';

interface HeroProps {
  showCustomTheme: boolean;
  toggleCustomTheme: () => void;
}

interface ToggleCustomThemeProps {
  showCustomTheme: boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      alignSelf="center"
      spacing={1}
      useFlexGap
      sx={{
        p: 1,
        borderRadius: '999px',
        border: '1px solid ',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Tooltip title="Switch to Material Design" placement="left">
        <BlockRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
      </Tooltip>
      <Switch
        checked={showCustomTheme}
        onChange={toggleCustomTheme}
        color="primary"
      />
      <Tooltip title="Switch to the custom theme" placement="right">
        <AutoAwesomeRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
      </Tooltip>
    </Stack>
  );
}

export default function Hero({ showCustomTheme, toggleCustomTheme }: HeroProps) {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <ToggleCustomTheme
            showCustomTheme={showCustomTheme}
            toggleCustomTheme={toggleCustomTheme}
          />
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Expand your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              products
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Explore our cutting-edge dashboard, delivering high-quality solutions
            tailored to your needs. <br />
            Elevate your experience with top-tier features and services.
          </Typography>
          <Stack
            direction="row"
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2 }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              placeholder="Your email address"
              inputProps={{
                autocomplete: 'off',
              }}
            />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/dashboard-placeholder-image-light.png")'
                : 'url("/static/images/templates/templates-images/dashboard-placeholder-image-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '16px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.1)}`,
          })}
        />
      </Container>
    </Box>
  );
}
