import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import SvgStackOverflow from 'docs/src/icons/SvgStackOverflow';

export default function AppFooter() {
  return (
    <Container component="footer">
      <Box
        sx={{
          pt: 4,
          pb: 8,
          display: 'grid',
          gridAutoColumns: '1fr',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
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
            Keep up to date
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Join our newsletter for regular updates. No spam ever.
          </Typography>
          <EmailSubscribe sx={{ mb: 1 }} />
        </div>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gridAutoColumns: '1fr',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Products
            </Typography>
            <Link href={ROUTES.productCore}>MUI Core</Link>
            <Link href={ROUTES.productAdvanced}>MUI X</Link>
            <Link href={ROUTES.productTemplates}>Templates</Link>
            <Link href={ROUTES.productDesignKits}>Design kits</Link>
            <Link href={ROUTES.productToolpad}>MUI Toolpad</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Resources
            </Typography>
            <Link href={ROUTES.materialIcons}>Material Icons</Link>
            <Link href={ROUTES.freeTemplates}>Free templates</Link>
            <Link href={ROUTES.components}>Components</Link>
            <Link href={ROUTES.customization}>Customization</Link>
            <Link href={ROUTES.theming}>Theming</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Explore
            </Typography>
            <Link href={ROUTES.documentation}>Documentation</Link>
            <Link href={ROUTES.store}>Store</Link>
            <Link href={ROUTES.blog}>Blog</Link>
            <Link href={ROUTES.showcase}>Showcase</Link>
            <Link href={ROUTES.roadmap}>Roadmap</Link>
            <Link href={ROUTES.languages}>Languages</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Company
            </Typography>
            <Link href={ROUTES.about}>About</Link>
            <Link href={ROUTES.vision}>Vision</Link>
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <Link href={ROUTES.careers}>Careers </Link>
              <Box
                sx={(theme) => ({
                  px: 0.5,
                  py: '3px',
                  ml: 1,
                  mb: '1px',
                  borderRadius: 0.5,
                  fontSize: theme.typography.pxToRem(9),
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#fff',
                  letterSpacing: '0.1rem',
                  bgcolor: 'success.main',
                  ...theme.applyDarkStyles({
                    bgcolor: 'success.900',
                  }),
                })}
              >
                Hiring
              </Box>
            </Box>
            <Link href={ROUTES.support}>Support</Link>
            <Link href={ROUTES.privacyPolicy}>Privacy policy</Link>
            <Link target="_blank" rel="noopener noreferrer" href="mailto:contact@mui.com">
              Contact us
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          py: 4,
          display: { xs: 'block', sm: 'flex' },
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'space-between' },
        }}
      >
        <Typography color="text.secondary" variant="body2">
          Copyright © {new Date().getFullYear()} Material UI SAS.
        </Typography>
        <Box sx={{ py: { xs: 2, sm: 0 } }}>
          <Stack spacing={2} direction="row">
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mui"
              aria-label="github"
              title="GitHub"
              size="small"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href={ROUTES.rssFeed}
              aria-label="RSS Feed"
              title="RSS Feed"
              size="small"
            >
              <RssFeedIcon fontSize="small" />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://stackoverflow.com/questions/tagged/mui"
              aria-label="Stack Overflow"
              title="Stack Overflow"
              size="small"
            >
              <SvgStackOverflow fontSize="small" />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/MUI_hq"
              aria-label="twitter"
              title="Twitter"
              size="small"
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/mui/"
              aria-label="linkedin"
              title="LinkedIn"
              size="small"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/@MUI_hq"
              aria-label="YouTube"
              title="YouTube"
              size="small"
            >
              <YouTubeIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
