import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';

export default function AppFooter() {
  return (
    <Container>
      <Box
        sx={{
          py: 8,
          display: 'grid',
          gridAutoColumns: '1fr',
          justifyContent: 'space-between',
          gap: (theme) => theme.spacing(4, 2),
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
          gridTemplateRows: 'auto',
          '& a': {
            mt: 1,
            color: 'text.secondary',
            typography: 'body2',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          },
        }}
      >
        <div>
          <SvgMuiLogo width={32} />
          <Typography variant="body2" fontWeight="bold" sx={{ pt: 2 }}>
            Join our newsletter!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No spam, guaranteed.
          </Typography>
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 360,
              display: 'inline-flex',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <InputBase
              placeholder="Enter your email"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[900]
                    : theme.palette.grey[100],
                px: 1,
                py: 0.5,
                typography: 'body2',
                flexGrow: 1,
                minWidth: 200,
              }}
            />
            <Button
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.grey[300],
                py: 1,
                px: 2,
                color: 'text.primary',
                borderRadius: '0px',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[400],
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </div>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gridAutoColumns: '1fr',
            gap: '16px 20px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Products
            </Typography>
            <Link href="/" className="text-sm footer-link">
              Core
            </Link>
            <Link href="/" className="text-sm footer-link">
              Advanced X
            </Link>
            <Link href="/" className="text-sm footer-link">
              Templates
            </Link>
            <Link href="/" className="text-sm footer-link">
              Design Kits
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Resources
            </Typography>
            <Link href="/" className="text-sm footer-link">
              Material Icons
            </Link>
            <Link href="/" className="text-sm footer-link">
              Free templates
            </Link>
            <Link href="/" className="text-sm footer-link">
              Components
            </Link>
            <Link href="/" className="text-sm footer-link">
              Customization
            </Link>
            <Link href="/" className="text-sm footer-link">
              Styling
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Explore
            </Typography>
            <Link href="/" className="text-sm footer-link">
              Documentation
            </Link>
            <Link href="/" className="text-sm footer-link">
              Blog
            </Link>
            <Link href="/" className="text-sm footer-link">
              Showcase
            </Link>
            <Link href="/" className="text-sm footer-link">
              Roadmap
            </Link>
            <Link href="/" className="text-sm footer-link">
              Languages
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Company
            </Typography>
            <Link href="/" className="text-sm footer-link">
              About
            </Link>
            <Link href="/" className="text-sm footer-link">
              Vision
            </Link>
            <Link href="/" className="text-sm footer-link">
              Careers
            </Link>
            <Link href="/" className="text-sm footer-link">
              Support
            </Link>
            <Link href="/" className="text-sm footer-link">
              Contact us
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ py: 4 }}>
        <Typography color="text.secondary" variant="body2">
          Currently v4.11.0. Released under the MIT License. Copyright © 2020 Material-UI.
        </Typography>
      </Box>
    </Container>
  );
}
