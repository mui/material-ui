import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { alpha } from '@mui/material/styles';

export default function TableOfContentsBanner() {
  return FEATURE_TOGGLE.enable_toc_banner ? (
    <Link
      href="https://ukraine.ua/news/stand-with-ukraine/" // Fix me!
      target="_blank"
      sx={(theme) => ({
        mb: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
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
      <Typography component="span" variant="caption" fontWeight="500" color="text.secondary">
        🇺🇦&#160;&#160;MUI stands in solidarity with the Ukrainian people against the Russian
        invasion.
        <br />
      </Typography>
      {/* <Typography component="span" variant="body2" fontWeight="medium" sx={{ color: 'primary.50' }}>
        Fix me!
        <br />
      </Typography> */}
      <Typography
        component="span"
        variant="caption"
        fontWeight="normal"
        color="text.secondary"
        sx={{
          mt: 1,
          pt: 1,
          borderTop: 1,
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[700]
              : theme.palette.grey[200],
        }}
      >
        Click here to help by requesting the end of the war.
      </Typography>
    </Link>
  ) : null;
}
