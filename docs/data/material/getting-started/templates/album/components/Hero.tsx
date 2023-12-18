import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function ProductHero() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `url("https://source.unsplash.com/random?wallpapers")`,
        backgroundSize: 'cover',
        color: 'white',
        height: '80vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          height: '80vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(40px)',
          alignItems: 'center',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              sx={{ zIndex: 1 }}
            >
              <Chip
                size="small"
                variant="outlined"
                label="New Arrival"
                sx={{ alignSelf: 'center', color: 'inherit' }}
              />
              <Typography
                component="h1"
                variant="h1"
                align="center"
                color="inherit"
                gutterBottom
              >
                Latest Products
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
                />
                <Button variant="contained">Start using</Button>
              </Stack>
              <Typography variant="caption" align="center" color="inherit" paragraph>
                By clicking "Explore Now," you agree to our{' '}
                <span>
                  <Link
                    href="#"
                    underline="hover"
                    color="inherit"
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
