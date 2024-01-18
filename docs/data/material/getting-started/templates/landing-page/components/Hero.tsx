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

import { greyColor, secondaryColor } from '../getLPTheme';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? `linear-gradient(to bottom, ${secondaryColor[100]}, #FFF)`
            : `linear-gradient(to bottom, ${secondaryColor[900]}, ${greyColor[900]})`,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 20,
        }}
      >
        <Stack spacing={3} sx={{ mx: { xs: '16px', sm: '0' }, width: '60%', mb: 4 }}>
          <Chip
            size="small"
            variant="filled"
            label="New arrivals"
            icon={<CelebrationRoundedIcon />}
            sx={{
              alignSelf: 'center',
              py: 2,
              px: 1,
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? `linear-gradient(to bottom right, ${secondaryColor[50]}, ${secondaryColor[100]})`
                  : `linear-gradient(to bottom right, ${secondaryColor[700]}, ${secondaryColor[900]})`,
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'light'
                  ? `${alpha(secondaryColor[500], 0.3)}`
                  : `${alpha(secondaryColor[500], 0.5)}`,
              fontWeight: '600',
              '& .MuiChip-label': {
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? secondaryColor[500]
                    : secondaryColor[200],
              },
              '& .MuiChip-icon': {
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? secondaryColor[500]
                    : secondaryColor[200],
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
            <Typography component="h1" variant="h1">
              Our latest&nbsp;
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? secondaryColor[400]
                    : secondaryColor[200],
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
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    boxShadow:
                      '0 1px 1px rgba(255, 255, 255, 0.1) inset, 0px 2px 4px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />
            <Button variant="contained" color="secondary">
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
            m: 6,
            alignSelf: 'center',
            height: '400px',
            width: '800px',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=3316&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            border: '4px solid',
            borderColor: `${alpha(greyColor[500], 0.9)}`,
            borderRadius: '12px',
          }}
        />
      </Container>
    </Box>
  );
}
