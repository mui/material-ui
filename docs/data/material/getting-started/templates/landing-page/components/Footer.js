import * as React from 'react';
import {
  Box,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Container,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Github';
import TwitterIcon from '@mui/icons-material/x';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MUI
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: { xs: 8, sm: 12 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Typography variant="subtitle2" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body1" color="text.secondary" component="div">
                Subscribe to our newsletter for updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  placeholder="Your email address"
                />
                <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Product
            </Typography>

            <Link color="inherit" href="#">
              Features
            </Link>

            <Link color="inherit" href="#">
              Testimonials
            </Link>

            <Link color="inherit" href="#">
              Highlights
            </Link>

            <Link color="inherit" href="#">
              Pricing
            </Link>

            <Link color="inherit" href="#">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Company
            </Typography>

            <Link color="inherit" href="#">
              About us
            </Link>

            <Link color="inherit" href="#">
              Careers
            </Link>

            <Link color="inherit" href="#">
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Legal
            </Typography>
            <Link color="inherit" href="#">
              Terms
            </Link>
            <Link color="inherit" href="#">
              Privacy
            </Link>
            <Link color="inherit" href="#">
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 8,
            width: '100%',
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              <Link color="inherit" href="#">
                Privacy Policy
              </Link>
              <Link color="inherit" href="#">
                Terms of Service
              </Link>
            </Typography>

            <Copyright />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <IconButton
              color="primary"
              component={Link}
              href="https://github.com/mui"
              aria-label="Github"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={Link}
              href="https://twitter.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={Link}
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
