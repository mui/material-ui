import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { greyColor, secondaryColor } from '../getAlbumTheme';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';

export default function ProductHero() {
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
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          minHeight: { xs: '85dvh', sm: '60vh' },
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(32px)',
          alignItems: 'center',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6} xl={4}>
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              sx={{ zIndex: 1, mx: { xs: '16px', sm: '0' } }}
            >
              <Chip
                size="small"
                variant="filled"
                label="New arrivals"
                icon={<CelebrationRoundedIcon />}
                sx={{
                  alignSelf: 'center',
                  fontWeight: '600',
                  backgroundColor: secondaryColor[800],
                  '& .MuiChip-label': {
                    color: secondaryColor[300],
                  },
                  '& .MuiChip-icon': {
                    color: secondaryColor[300],
                  },
                }}
              />
              <Typography
                component="h1"
                variant="h1"
                align="center"
                color="inherit"
                gutterBottom
              >
                Latest products
              </Typography>
              <Typography variant="body1" align="center" color="inherit" paragraph>
                Discover our newest collection of high-quality products. From
                electronics to fashion, we have something for everyone.
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ pt: 2 }}
              >
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  placeholder="Your email address"
                  sx={{ minWidth: '45%' }}
                />
                <Button variant="contained" color="secondary">
                  Start using
                </Button>
              </Stack>
              <Typography
                variant="caption"
                align="center"
                color={greyColor[500]}
                paragraph
              >
                By clicking "Start using" you agree to our{' '}
                <span>
                  <Link
                    href="#"
                    underline="hover"
                    color="primary.light"
                    sx={{ fontWeight: 600 }}
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
