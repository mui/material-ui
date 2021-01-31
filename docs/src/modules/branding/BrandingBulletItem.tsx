import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from 'docs/src/modules/branding/icons/Check';

interface BrandingBulletItemProps {
  children?: React.ReactNode;
  variant?: 'dark' | 'light';
}

export default function BrandingBulletItem(props: BrandingBulletItemProps) {
  const { children, variant = 'light', ...other } = props;
  return (
    <Box component="li" {...other} sx={{ display: 'flex', my: variant === 'light' ? 2 : '20px' }}>
      <CheckIcon
        sx={{
          display: 'inline-block',
          width: 24,
          height: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: variant === 'light' ? 'primary.main' : 'vividBlue',
          borderRadius: '50%',
          padding: '4px',
          boxSizing: 'content-box',
          mr: '11px',
          mt: '-2px',
        }}
      />
      <Typography component="span">{children}</Typography>
    </Box>
  );
}
