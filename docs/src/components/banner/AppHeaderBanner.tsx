import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

function getSurveyMessage() {
  return (
    <React.Fragment>
      {`🚀 Influence MUI's 2024 roadmap! Participate in the latest`}
      &nbsp;
      <Link
        href="https://tally.so/r/3Ex4PN?source=website"
        target="_blank"
        color="inherit"
        underline="always"
        sx={{
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
      🎉&#160;Material UI v6 is out now! Check out the&#160;
      <Link
        href="https://mui.com/blog/material-ui-v6-is-out"
        target="_blank"
        color="inherit"
        underline="always"
        sx={{
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        announcement blog post →
      </Link>
      .
    </React.Fragment>
  );
}

export default function AppHeaderBanner() {
  const showSurveyMessage = false;
  const bannerMessage = showSurveyMessage ? getSurveyMessage() : getDefaultHiringMessage();

  return FEATURE_TOGGLE.enable_website_banner ? (
    <Typography
      fontWeight="medium"
      sx={(theme) => ({
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
      })}
    >
      {bannerMessage}
    </Typography>
  ) : null;
}
