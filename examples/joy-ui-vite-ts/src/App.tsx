import * as React from 'react';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import SvgIcon from '@mui/joy/SvgIcon';

function Copyright() {
  return (
    <Typography level="body-md" color="neutral" sx={{ textAlign: 'center' }}>
      {'Copyright © '}
      <Link href="https://mui.com/">Your Website</Link> {new Date().getFullYear()}.
    </Typography>
  );
}

function Arrow() {
  return (
    <SvgIcon>
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </SvgIcon>
  );
}

export default function App() {
  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <Typography level="h2">Joy UI Vite.js example in TypeScript</Typography>
        <Button
          sx={{ mt: 6, mb: 3 }}
          variant="soft"
          component="a"
          href="https://mui.com/joy-ui/getting-started/templates/"
          endDecorator={<Arrow />}
        >
          See more examples
        </Button>
        <Copyright />
      </Card>
    </Container>
  );
}
