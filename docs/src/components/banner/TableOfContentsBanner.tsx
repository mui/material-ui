import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import { alpha } from '@mui/material/styles';

export default function TableOfContentsBanner() {
  return FEATURE_TOGGLE.enable_toc_banner ? (
    <Link
      href="https://war.ukraine.ua/support-ukraine/"
      target="_blank"
      sx={[
        (theme) => ({
          mb: 3,
          mx: 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'auto',
          backgroundColor: alpha(theme.palette.grey[50], 0.4),
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.grey[200],
          borderRadius: 1,
          transitionProperty: 'all',
          transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover, &:focus-visible': {
            borderColor: (theme.vars || theme).palette.primary[200],
          },
        }),
        (theme) =>
          theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primary[900], 0.2),
            borderColor: (theme.vars || theme).palette.primaryDark[700],
            '&:hover, &:focus-visible': {
              borderColor: (theme.vars || theme).palette.primaryDark[500],
            },
          }),
      ]}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ height: 5 + 1, backgroundColor: '#0057b7' }} />
        <Box sx={{ height: 5, backgroundColor: '#ffd700' }} />
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography component="span" variant="caption" fontWeight="normal" color="text.secondary">
          MUI stands in solidarity with the Ukrainian people.
        </Typography>
      </Box>
    </Link>
  ) : null;
}
