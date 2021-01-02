import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Link from 'docs/src/modules/components/Link';
import t1 from 'docs/src/modules/branding/t1';

interface BrandingLogoProps {
  href?: string;
  variant?: 'lockup' | 'icon';
  sx?: BoxProps['sx'];
}

export default function BrandingLogo(props: BrandingLogoProps) {
  const { href, variant = 'lockup', sx } = props;
  return (
    <Box component={href ? Link : 'div'} href={href} sx={{ display: 'inline-flex', ...sx }}>
      <img height="32" src={`/static/branding/logo-${variant}.svg`} alt={t1('Material-UI Logo')} />
    </Box>
  );
}
