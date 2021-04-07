import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Link from 'docs/src/modules/components/Link';
import t1 from 'docs/src/modules/branding/t1';

interface BrandingLogoProps {
  sx?: BoxProps['sx'];
  variant?: 'lockup' | 'lockup-inverted' | 'icon';
}

export default function BrandingLogo(props: BrandingLogoProps) {
  const { variant = 'lockup', sx } = props;
  return (
    <Box component={Link} href="/" sx={{ display: 'inline-flex', pt: '3px', ...sx }}>
      <img
        height="32"
        width={variant.indexOf('lockup') !== -1 ? 178 : 36}
        src={`/static/branding/logo-${variant}.svg`}
        alt={t1('Material-UI Logo')}
      />
    </Box>
  );
}
