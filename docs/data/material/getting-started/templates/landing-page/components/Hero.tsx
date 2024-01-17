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

import { greyColor, secondaryColor, brandColor } from '../getLPTheme';

const StyledSpan = {
  underline: {
    position: 'relative',
    display: 'inline-block',
    textDecoration: 'underline',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -2,
      width: '100%',
      height: 2,
      backgroundColor: '#fff',
      borderRadius: 2,
    },
  },
};

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundImage: `url("https://images.unsplash.com/photo-1638272181967-7d3772a91265?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: 'cover',
        color: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          minHeight: { xs: '85dvh', sm: '60vh' },
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(32px)',
        }}
      >
        <Container
          sx={{
            maxWidth: '100%',
            pl: '80px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: '50px',
          }}
        >
          <Stack
            direction="column"
            spacing={3}
            sx={{ zIndex: 1, mx: { xs: '16px', sm: '0' }, width: '50%' }}
          >
            <Chip
              size="small"
              variant="filled"
              label="New arrivals"
              icon={<CelebrationRoundedIcon />}
              sx={{
                alignSelf: 'flex-start',
                fontWeight: '600',
                backgroundColor: secondaryColor[700],
                py: 2,
                px: 1,
                gap: 0.5,
                '& .MuiChip-label': {
                  color: secondaryColor[100],
                },
                '& .MuiChip-icon': {
                  color: secondaryColor[100],
                },
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography component="h1" variant="h1" color="inherit">
                Latest&nbsp;
              </Typography>
              <Typography component="h1" variant="h1" color={secondaryColor[200]}>
                products
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="inherit"
              paragraph
              sx={{ opacity: 0.7 }}
            >
              Discover our newest collection of high-quality products.
              <br />
              From electronics to fashion, we have something for everyone.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                placeholder="Your email address"
                sx={{
                  minWidth: '45%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      backgroundColor: `${alpha(greyColor[50], 0.1)}`,
                      borderColor: greyColor[600],
                      boxShadow:
                        '0 1px 1px rgba(255, 255, 255, 0.1) inset, 0px 2px 4px rgba(0, 0, 0, 0.8)',
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
              sx={{ opacity: 0.7 }}
            >
              By clicking &quot;Start using&quot; you agree to our&nbsp;
              <span>
                <Link
                  href="#"
                  color="primary"
                  sx={{
                    color: brandColor[200],
                  }}
                >
                  Terms & Conditions
                </Link>
              </span>
            </Typography>
          </Stack>
          <Box
            id="image"
            sx={{
              position: 'absolute',
              right: 0,
              height: '70%',
              width: '50%',
              mr: '32px',
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
    </Box>
  );
}
