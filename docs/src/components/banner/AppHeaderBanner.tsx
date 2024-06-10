import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

function getSurveyMessage() {
  return (
    <React.Fragment>
      {`🚀 Influence MUI's 2024 roadmap! Participate in the latest`}
      &nbsp;
      <Link
        href="https://tally.so/r/3Ex4PN?source=website"
        target="_blank"
        underline="always"
        sx={{
          color: 'inherit',
          '&:hover': {
            opacity: 0.9,
          },
        }}
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
        sx={{
          color: 'inherit',
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        Check the careers page →
      </Link>
    </React.Fragment>
  );
}

export default function AppHeaderBanner() {
  const showSurveyMessage = false;
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
