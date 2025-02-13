import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

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
      {`🚀 Influence MUI's 2025 roadmap! Participate in the latest`}
      &nbsp;
      <Link
        href="https://tally.so/r/mObbvk?source=website"
        target="_blank"
        underline="always"
        sx={linkStyleOverrides}
      >
        Developer Survey →
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

export default function AppHeaderBanner() {
  const showSurveyMessage = true;
  const bannerMessage = showSurveyMessage ? getSurveyMessage() : getDefaultHiringMessage();

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
