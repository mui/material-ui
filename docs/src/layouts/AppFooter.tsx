/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import ROUTES from '../route';

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
            <NextLink href={ROUTES.productCore} passHref>
              <Link>Core</Link>
            </NextLink>
            <NextLink href={ROUTES.productAdvanced} passHref>
              <Link>Advanced X</Link>
            </NextLink>
            <NextLink href={ROUTES.productTemplates} passHref>
              <Link>Templates</Link>
            </NextLink>
            <NextLink href={ROUTES.productDesignKits} passHref>
              <Link>Design Kits</Link>
            </NextLink>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Resources
            </Typography>
            <NextLink href={ROUTES.materialIcons} passHref>
              <Link>Material Icons</Link>
            </NextLink>
            <NextLink href={ROUTES.freeTemplates} passHref>
              <Link>Free templates</Link>
            </NextLink>
            <NextLink href={ROUTES.components} passHref>
              <Link>Components</Link>
            </NextLink>
            <NextLink href={ROUTES.customization} passHref>
              <Link>Customization</Link>
            </NextLink>
            <NextLink href={ROUTES.styling} passHref>
              <Link>Styling</Link>
            </NextLink>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Explore
            </Typography>
            <NextLink href={ROUTES.documentation} passHref>
              <Link>Documentation</Link>
            </NextLink>
            <NextLink href={ROUTES.blog} passHref>
              <Link>Blog</Link>
            </NextLink>
            <NextLink href={ROUTES.showcase} passHref>
              <Link>Showcase</Link>
            </NextLink>
            <NextLink href={ROUTES.roadmap} passHref>
              <Link>Roadmap</Link>
            </NextLink>
            <NextLink href={ROUTES.languages} passHref>
              <Link>Languages</Link>
            </NextLink>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Company
            </Typography>
            <NextLink href={ROUTES.about}>
              <Link>About</Link>
            </NextLink>
            <NextLink href={ROUTES.vision}>
              <Link>Vision</Link>
            </NextLink>
            <NextLink href={ROUTES.careers}>
              <Link>Careers</Link>
            </NextLink>
            <NextLink href={ROUTES.support}>
              <Link>Support</Link>
            </NextLink>
            <NextLink href={ROUTES.contactUs}>
              <Link>Contact us</Link>
            </NextLink>
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
