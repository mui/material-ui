import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface BrandingCardProps {
  children?: React.ReactNode;
  color?: 'primary' | 'info';
  icon?: React.ReactNode;
  sx?: BoxProps['sx'];
  title?: string;
}

export default function BrandingCard(props: BrandingCardProps) {
  const { color, icon, title, children, sx, ...other } = props;
  return (
    <Box sx={{ mb: 5, ...sx }} {...other}>
      <Avatar
        sx={{
          mb: 3,
          bgcolor: color === 'info' ? 'vividBlue' : 'primary.main',
          width: 80,
          height: 80,
        }}
        aria-label={title}
      >
        {icon}
      </Avatar>
      <Typography variant="h3">{title}</Typography>
      <Typography component="div">{children}</Typography>
    </Box>
  );
}
