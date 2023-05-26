import * as React from 'react';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Link from '@mui/joy/Link';
// import ProTip from './ProTip';

function Copyright() {
  return (
    <Typography level="body2" color="neutral" align="center">
      {'Copyright © '}
      <Link href="https://mui.com/" color="neutral">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <Typography level="h2">
          Joy UI Vite.js example in TypeScript
        </Typography>
        <Button sx={{ mt: 6, mb: 3 }} variant="soft" component="a" href="https://mui.com/material-ui/getting-started/templates/" endDecorator={<KeyboardArrowRight />}>
            See more examples
        </Button>
        <Copyright />
      </Card>
    </Container>
  );
}