import * as React from 'react';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { alpha } from '@mui/material/styles';

export default function AppFrameBanner() {
  //const bannerMessage  = `🚀 We're hiring a Designer, Full-stack Engineer, React Support Engineer, and more!`;
  //const bannerLink = ROUTES.careers
  const bannerMessage = `📫 Take a few minutes to complete our survey and help us shape the roadmap for 2023!`;
  const bannerLink = ROUTES.survey2022Docs;

  return FEATURE_TOGGLE.enable_docsnav_banner ? (
    <Link
      href={bannerLink}
      target="_blank"
      variant="caption"
      sx={(theme) => ({
        display: { xs: 'none', lg: 'block' },
        p: 1,
        maxHeight: '34px',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary[900], 0.3)
            : theme.palette.primary[50],
        border: '1px solid',
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200],
        borderRadius: 1,
        transitionProperty: 'all',
        transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        color:
          theme.palette.mode === 'dark' ? theme.palette.primary[100] : theme.palette.primary[600],
        fontWeight: 'medium',
        '&:hover, &:focus-visible': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary[900], 0.6)
              : alpha(theme.palette.primary[100], 0.4),
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[500]
              : theme.palette.primary[200],
        },
      })}
    >
      {bannerMessage}
      <br />
    </Link>
  ) : null;
}
