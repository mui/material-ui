import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
// import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { alpha } from '@mui/material/styles';

export default function TableOfContentsBanner() {
  return FEATURE_TOGGLE.enable_toc_banner ? (
    <Link
      href="https://www.change.org/p/%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C-%D0%B2%D0%BE%D0%B9%D0%BD%D1%83-%D1%81-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%BE%D0%B9-2ce0a2d7-b957-4e23-981a-c67a26e2b0b7?cs_tk=AtzoDie-d7wPH5wkJmIAAXicyyvNyQEABF8BvDWGKBrzpzmlPrhKFp7sRDI%3D" // Fix me!
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
        ✋&#160;&#160;MUI stands in solidarity with the Ukranian people against the Russian
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
