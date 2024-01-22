import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material';

import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';

import { greyColor, brandColor } from '../getLPTheme';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? `linear-gradient(to bottom, ${brandColor[200]}, #FFF)`
            : `linear-gradient(to bottom, ${brandColor[800]}, ${greyColor[900]})`,
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
        <Stack spacing={2} sx={{ width: { xs: '100%', sm: '60%' } }}>
          <Chip
            size="small"
            variant="filled"
            label="New arrivals"
            icon={<CelebrationRoundedIcon />}
            sx={{
              alignSelf: 'center',
              py: 1.5,
              px: 0.5,
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? `linear-gradient(to bottom right, ${brandColor[50]}, ${brandColor[100]})`
                  : `linear-gradient(to bottom right, ${brandColor[700]}, ${brandColor[900]})`,
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'light'
                  ? `${alpha(brandColor[500], 0.3)}`
                  : `${alpha(brandColor[500], 0.5)}`,
              fontWeight: '600',
              '& .MuiChip-label': {
                color: (theme) =>
                  theme.palette.mode === 'light' ? brandColor[500] : brandColor[200],
              },
              '& .MuiChip-icon': {
                color: (theme) =>
                  theme.palette.mode === 'light' ? brandColor[500] : brandColor[200],
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            <Typography component="h1" variant="h1">
              Our latest&nbsp;
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? brandColor[500] : brandColor[200],
              }}
            >
              products
            </Typography>
          </Box>
          <Typography
            variant="body1"
            textAlign="center"
            paragraph
            sx={{ opacity: 0.8 }}
          >
            Discover our newest collection of high-quality products. From electronics
            to fashion, we have something for everyone.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ pt: 2, alignSelf: 'center' }}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              placeholder="Your email address"
              sx={{
                minWidth: '250px',
              }}
            />
            <Button variant="contained" color="primary">
              Start using
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="inherit"
            paragraph
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start using&quot; you agree to our&nbsp;
            <span>
              <Link href="#" color="primary" sx={{ opacity: 1 }}>
                Terms & Conditions
              </Link>
            </span>
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: '200px', sm: '600px' },
            width: 'calc(100% - 8px)',
            backgroundImage: (theme) =>
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/dashboard-placeholder-image-light.png")'
                : 'url("/static/images/templates/templates-images/dashboard-placeholder-image-dark.png")',
            backgroundSize: 'cover',
            outline: '4px solid',
            outlineColor: `${alpha(brandColor[500], 0.2)}`,
            borderRadius: '12px',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          }}
        />
      </Container>
    </Box>
  );
}
