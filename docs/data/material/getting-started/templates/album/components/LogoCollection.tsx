import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  margin: '0 40px',
};

const LogoCollection = () => {
  return (
    <Box
      sx={{ my: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography color="GrayText" variant="h6" sx={{ textAlign: 'center' }}>
        Used by the best companies
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index + 1}`} style={logoStyle} />
        ))}
      </Box>
    </Box>
  );
};

export default LogoCollection;
