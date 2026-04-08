import * as React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

const linkStyleOverrides = (theme: Theme) => ({
  color: 'inherit',
  textDecorationColor: 'currentColor',
  '&:hover': {
    color: (theme.vars || theme).palette.primary[200],
  },
  ...theme.applyDarkStyles({
    color: 'inherit',
    '&:hover': {
      color: (theme.vars || theme).palette.primary[200],
    },
  }),
});

function getSurveyMessage() {
  return (
    <React.Fragment>
      {`🎉 Material UI v9 is out now! Check out the `}
      &nbsp;
      <Link
        href="https://mui.com/blog/introducing-mui-v9/"
        target="_blank"
        underline="always"
        sx={linkStyleOverrides}
      >
        announcement blog post. →
      </Link>
    </React.Fragment>
  );
}

function getDefaultHiringMessage() {
  return (
    <React.Fragment>
      🚀&#160;&#160;We&apos;re hiring a Designer, Full-stack Engineer, React Community Engineer, and
      more!&nbsp;&#160;
      <Link
        // Fix me!
        href={ROUTES.careers}
        target="_blank"
        underline="always"
        sx={linkStyleOverrides}
      >
        Check the careers page →
      </Link>
    </React.Fragment>
  );
}

function getPricingMessage() {
  return (
    <React.Fragment>
      {`📣 MUI X pricing is changing on April 8, 2026.`}
      &nbsp;
      <Link href="/blog/2026-MUI-X-price-changes/" underline="always" sx={linkStyleOverrides}>
        Read the announcement →
      </Link>
    </React.Fragment>
  );
}

function getBannerMessage(isPricingPage: boolean, showSurveyMessage: boolean) {
  if (isPricingPage) {
    return getPricingMessage();
  }
  if (showSurveyMessage) {
    return getSurveyMessage();
  }
  return getDefaultHiringMessage();
}

export default function AppHeaderBanner() {
  const router = useRouter();
  const { canonicalAsServer } = pathnameToLanguage(router.asPath);
  const showSurveyMessage = true;
  const isPricingPage = canonicalAsServer === ROUTES.pricing;
  const bannerMessage = getBannerMessage(isPricingPage, showSurveyMessage);

  return FEATURE_TOGGLE.enable_website_banner ? (
    <Typography
      sx={[
        {
          fontWeight: 'medium',
        },
        (theme) => ({
          color: '#fff',
          p: '12px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          justifyContent: 'center',
          fontSize: theme.typography.pxToRem(13),
          background: `linear-gradient(-90deg, ${(theme.vars || theme).palette.primary[700]}, ${
            (theme.vars || theme).palette.primary[500]
          } 120%)`,
          ...theme.applyDarkStyles({
            background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[900]}, ${
              (theme.vars || theme).palette.primary[600]
            } 120%)`,
          }),
        }),
      ]}
    >
      {bannerMessage}
    </Typography>
  ) : null;
}
