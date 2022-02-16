import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

export default function TableOfContentsBanner() {
  return FEATURE_TOGGLE.enable_toc_banner ? (
    <Link
      href={ROUTES.home} // Fix me!
      target="_blank"
      data-ga-event-category="$event-category" // Fix me!
      data-ga-event-action="click"
      data-ga-event-label="table-contents"
      sx={(theme) => ({
        mb: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, ${theme.palette.primary[900]}, ${theme.palette.primary[600]} 120%)`
            : `linear-gradient(-90deg, ${theme.palette.primary[700]}, ${theme.palette.primary[500]} 120%)`,
        borderRadius: 1,
        transitionProperty: 'all',
        transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '200ms',
        '&:hover, &:focus-visible': {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '1px 1px 20px 0 rgb(2 2 2 / 50%)'
              : '1px 1px 20px 0 rgb(90 105 120 / 30%)',
        },
      })}
    >
      <Typography component="span" variant="body1" fontWeight="bold" sx={{ color: '#fff' }}>
        Fix me!
        <br />
      </Typography>
      <Typography component="span" variant="body2" fontWeight="medium" sx={{ color: 'primary.50' }}>
        Fix me!
        <br />
      </Typography>
      <Typography
        component="span"
        variant="caption"
        fontWeight="normal"
        sx={{
          mt: 1,
          pt: 1,
          color: 'primary.50',
          borderTop: 1,
          borderColor: 'primary.400',
        }}
      >
        Fix me!
      </Typography>
    </Link>
  ) : null;
}
