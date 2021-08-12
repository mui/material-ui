/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Stack from '@material-ui/core/Stack';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import ROUTES from 'docs/src/route';

export default function AppFooter() {
  return (
    <Container component="footer">
      <Box
        sx={{
          py: 8,
          display: 'grid',
          gridAutoColumns: '1fr',
          justifyContent: 'space-between',
          gap: (theme) => theme.spacing(4, 2),
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
          gridTemplateRows: 'auto',
          '& a:not(.MuiIconButton-root)': {
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
          <EmailSubscribe sx={{ mb: 1 }} />
          <Stack spacing={1} direction="row">
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://github.com/mui-org/material-ui"
              aria-label="github"
              title="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://twitter.com/MaterialUI"
              aria-label="twitter"
              title="Twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/company/material-ui/"
              aria-label="linkedin"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
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
            <NextLink href={ROUTES.about} passHref>
              <Link>About</Link>
            </NextLink>
            <NextLink href={ROUTES.vision} passHref>
              <Link>Vision</Link>
            </NextLink>
            <NextLink href={ROUTES.careers} passHref>
              <Link>Careers</Link>
            </NextLink>
            <NextLink href={ROUTES.support} passHref>
              <Link>Support</Link>
            </NextLink>
            <NextLink href={ROUTES.contactUs} passHref>
              <Link>Contact us</Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ py: 4 }}>
        <Typography color="text.secondary" variant="body2">
          Copyright © {new Date().getFullYear()} Material-UI.
        </Typography>
      </Box>
    </Container>
  );
}
