import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

export default function AppHeaderBanner() {
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
        background: `linear-gradient(-90deg, ${(theme.vars || theme).palette.primary[700]}, ${
          (theme.vars || theme).palette.primary[500]
        } 120%)`,
        fontSize: theme.typography.pxToRem(13),
        ...theme.applyDarkStyles({
          background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[900]}, ${
            (theme.vars || theme).palette.primary[600]
          } 120%)`,
        }),
      })}
    >
      🚀&#160;&#160;We&apos;re hiring a Designer, Full-stack Engineer, React Support Engineer, and
      more!&nbsp;&#160;
      <Link
        href={ROUTES.careers} // Fix me!
        target="_blank"
        sx={{
          fontWeight: 'semiBold',
          textDecoration: 'underline',
          color: '#fff',
          '&:hover': { color: 'grey.200' },
        }}
      >
        Check the careers page →
      </Link>
    </Typography>
  ) : null;
}
