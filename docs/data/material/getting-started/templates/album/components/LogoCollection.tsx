import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const logos = [
  'https://www.svgrepo.com/show/303141/spotify-1-logo.svg',
  'https://www.svgrepo.com/show/303132/coca-cola-logo.svg',
  'https://www.svgrepo.com/show/303225/visa-logo.svg',
  'https://www.svgrepo.com/show/303196/netflix-2-logo.svg',
  'https://www.svgrepo.com/show/303257/paypal-logo.svg',
];

const logoStyle = {
  width: '80px',
  height: 'auto',
  margin: '0 20px', // Adjusted margin for smaller screens
};

const LogoCollection = () => {
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography
        component="h2"
        variant="h6"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Trusted by the best companies
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} style={logoStyle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LogoCollection;
