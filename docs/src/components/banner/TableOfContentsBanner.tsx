import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

export default function TableOfContentsBanner() {
  return FEATURE_TOGGLE.enable_toc_banner ? (
    <Link
      href="https://ukraine.ua/news/stand-with-ukraine/" // Fix me!
      target="_blank"
      sx={(theme) => ({
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        border: '1px solid',
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200],
        borderRadius: 1,
        transitionProperty: 'all',
        transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        '&:hover, &:focus-visible': {
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[500]
              : theme.palette.grey[300],
        },
      })}
    >
      <Typography
        component="span"
        variant="caption"
        fontWeight="500"
        color="text.primary"
        sx={(theme) => ({
          p: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0, 87, 183, 0.2)' : 'rgba(0, 87, 183, 0.1)',
        })}
      >
        MUI stands in solidarity with the Ukrainian people against the Russian invasion.
        <br />
      </Typography>
      <Typography
        component="span"
        variant="caption"
        fontWeight="normal"
        color="text.primary"
        sx={(theme) => ({
          p: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.08)',
        })}
      >
        Click here to help by requesting the end of the war.
      </Typography>
    </Link>
  ) : null;
}
