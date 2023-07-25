import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@/components/Link';

export default function LinksPage() {
  return (
    <Box
      sx={{ display: 'flex', minWidth: '100vw', minHeight: '100vh', backgroundColor: '#fafafa' }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: 500,
            ml: '0.25rem',
            mt: 3,
            py: 1,
          }}
        >
          Useful links
        </Typography>
        <Divider />
        <Box component="ul" sx={{ pl: 3 }}>
          {[
            'https://github.com/reactwg/server-components/discussions/4',
            'https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md',
            'https://github.com/vercel/next.js/discussions/52119',
          ].map((href) => (
            <li key={href}>
              <Link href={href}>{href}</Link>
            </li>
          ))}
        </Box>

        <Button component={Link} href="/" variant="contained" sx={{ alignSelf: 'center', mt: 8 }}>
          Back to main page
        </Button>
      </Container>
    </Box>
  );
}
