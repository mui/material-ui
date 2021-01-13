import * as React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface BrandingCardProps {
  color?: 'primary' | 'info';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
}

const BrandingCard = (props: BrandingCardProps) => {
  const { color, icon, title, children, ...other } = props;
  return (
    <Box sx={{ mb: 4 }} {...other}>
      <Box
        sx={{
          mb: 3,
          '& [class*="MuiAvatar-root"]': {
            bgcolor: color === 'info' ? 'vividBlue' : 'primary.main',
            width: 80,
            height: 80,
          },
        }}
      >
        <Avatar aria-label={title}>{icon}</Avatar>
      </Box>
      <Box>
        <Typography variant="h3">{title}</Typography>
        <Typography component="div">{children}</Typography>
      </Box>
    </Box>
  );
};

export default BrandingCard;
