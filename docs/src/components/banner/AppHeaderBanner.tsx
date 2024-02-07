import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

function getSurveyMessage() {
  return (
    <React.Fragment>
      {`🚀 Support Palestine 🇵🇸 Help Provide Humanitarian Aid to Palestine.`}
      &nbsp;
      <Link
        href="https://globalmedic.ca/middle-east-conflict-response-2023/?gclid=CjwKCAiA8YyuBhBSEiwA5R3-ExozuYSylArX9nS7DFsL05cM1-YWm0ufLZNVLzuB20yQBfgefRjM-RoCQfgQAvD_BwE"
        target="_blank"
        color="inherit"
        underline="always"
        sx={{
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        Click here →
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
        href={ROUTES.careers} // Fix me!
        target="_blank"
        color="inherit"
        underline="always"
        sx={{
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
  const showSurveyMessage = true;
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
