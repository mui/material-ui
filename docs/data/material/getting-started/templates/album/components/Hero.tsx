import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

export default function ProductHero() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `url("https://source.unsplash.com/random?wallpapers")`,
        backgroundSize: 'cover',
        color: 'white',
        height: '85vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 10,
          top: 'inherit',
          width: '100%',
          height: '85vh',
          minHeight: 500,
          maxHeight: 1300,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(40px)',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          sx={{ zIndex: 1, maxWidth: '50%' }}
        >
          <Chip
            size="small"
            variant="outlined"
            label="Product highlight"
            sx={{ alignSelf: 'center', color: 'inherit' }}
          />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
          >
            Main header
          </Typography>
          <Typography variant="body1" align="center" color="inherit" paragraph>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
            Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis
            ligula consectetur
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">Main action</Button>
            <Button variant="text" color="inherit">
              Secondary action
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            zIndex: 1,
            width: '80%',
            backgroundImage: `url("https://mui.com/static/joy-ui/overview/order-dashboard.png")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9,
            minHeight: 600,
            maxHeight: 1300,
            mb: 4,
          }}
        />
      </Box>
    </Box>
  );
}
