import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import ProTip from './ProTip';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Tailwind CSS example
        </Typography>
        <ProTip />
        <Typography variant="h6" gutterBottom>
          This is an example of how you can use Tailwind on the MUI components
        </Typography>
        <Slider
          className="my-4"
          defaultValue={30}
          classes={{ active: 'shadow-none' }}
          componentsProps={{ thumb: { className: 'hover:shadow-none' } }}
        />
        <Copyright />
      </Box>
    </Container>
  );
}
