import * as React from 'react';
import PropTypes from 'prop-types';
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

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        px: 1,
        borderRadius: '999px',
        border: '1px solid ',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Tooltip title="Material Design" placement="left">
        <BlockRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
      </Tooltip>
      <Switch
        checked={showCustomTheme}
        onChange={toggleCustomTheme}
        color="primary"
      />
      <Tooltip title="Custom theme" placement="right">
        <AutoAwesomeRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
      </Tooltip>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

function Hero({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient( #9CCCFC, #FFF)'
            : 'linear-gradient( #02294F, #090E10)',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
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
            Our latest&nbsp;
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
          <Typography variant="body1" textAlign="center" sx={{ opacity: 0.8 }}>
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
              sx={{
                minWidth: '250px',
              }}
            />
            <Button variant="contained" color="primary">
              Start using
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start using&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 600 },
            width: '100%',
            backgroundImage: (theme) =>
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/dashboard-placeholder-image-light.png")'
                : 'url("/static/images/templates/templates-images/dashboard-placeholder-image-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? `0 0 24px 12px ${alpha('#9CCCFC', 0.3)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          }}
        />
      </Container>
    </Box>
  );
}

Hero.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default Hero;
