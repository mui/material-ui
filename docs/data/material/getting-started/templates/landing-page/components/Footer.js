import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sitemark&nbsp;
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
              <Box sx={{ ml: '-15px' }}>
                <img
                  src={
                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                  }
                  style={logoStyle}
                  alt="logo"
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  placeholder="Your email address"
                  inputProps={{
                    autocomplete: 'off',
                  }}
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
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Product
            </Typography>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              Features
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              Testimonials
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              Highlights
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              Pricing
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
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
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Company
            </Typography>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              About us
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
              Careers
            </Link>

            <Link color="inherit" href="#" sx={{ opacity: 0.7 }}>
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
            <Typography variant="body2" textAlign="left" sx={{ fontWeight: 600 }}>
              Legal
            </Typography>
            <Link color="inherit" textAlign="left" href="#" sx={{ opacity: 0.7 }}>
              Terms
            </Link>
            <Link color="inherit" textAlign="left" href="#" sx={{ opacity: 0.7 }}>
              Privacy
            </Link>
            <Link color="inherit" textAlign="left" href="#" sx={{ opacity: 0.7 }}>
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 8,
            mt: 8,
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link variant="body2" color="text.secondary" href="#">
              Privacy Policy
            </Link>
            <span>&nbsp;•&nbsp;</span>
            <Link variant="body2" color="text.secondary" href="#">
              Terms of Service
            </Link>

            <Copyright />
          </div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              gap: 1,
              color: 'text.secondary',
            }}
          >
            <IconButton
              color="inherit"
              href="https://github.com/mui"
              aria-label="Github"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
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
