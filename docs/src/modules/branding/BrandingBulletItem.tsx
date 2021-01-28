import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from 'docs/src/modules/branding/icons/Check';

interface BrandingBulletItemProps {
  children?: React.ReactNode;
}

export default function BrandingBulletItem(props: BrandingBulletItemProps) {
  const { children, ...other } = props;
  return (
    <Box component="li" {...other} sx={{ display: 'flex' }}>
      <CheckIcon
        sx={{
          display: 'inline-block',
          width: 24,
          height: 24,
          background: 'rgba(255,255,255,0.4)',
          color: 'primary.main',
          borderRadius: '50%',
          mr: 2,
          mt: '2px',
        }}
      />
      <Typography component="span">{children}</Typography>
    </Box>
  );
}
