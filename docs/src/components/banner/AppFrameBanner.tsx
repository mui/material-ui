import * as React from 'react';
import Link from 'docs/src/modules/components/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { alpha } from '@mui/material/styles';

export default function AppFrameBanner() {
  return FEATURE_TOGGLE.enable_docsnav_banner ? (
    <Link
      href="https://mui.com/blog/mui-x-v6/"
      target="_blank"
      variant="caption"
      sx={[
        (theme) => ({
          display: { xs: 'none', lg: 'block' },
          p: 1,
          maxHeight: '34px',
          backgroundColor: (theme.vars || theme).palette.primary[50],
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.grey[200],
          borderRadius: 1,
          transitionProperty: 'all',
          transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          color: (theme.vars || theme).palette.primary[600],
          fontWeight: 'medium',
          '&:hover, &:focus-visible': {
            backgroundColor: alpha(theme.palette.primary[100], 0.4),
            borderColor: (theme.vars || theme).palette.primary[200],
          },
        }),
        (theme) =>
          theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primary[900], 0.3),
            borderColor: (theme.vars || theme).palette.primaryDark[700],
            color: (theme.vars || theme).palette.primary[100],
            '&:hover, &:focus-visible': {
              backgroundColor: alpha(theme.palette.primary[900], 0.6),
              borderColor: (theme.vars || theme).palette.primaryDark[500],
            },
          }),
      ]}
    >
      🚀 MUI X v6 is out! Discover what&apos;s new and get started now!
      <br />
    </Link>
  ) : null;
}
