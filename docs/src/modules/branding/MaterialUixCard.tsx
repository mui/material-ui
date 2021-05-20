import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface MaterialUixCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  sx?: BoxProps['sx'];
  title?: string;
}

export default function MaterialUixCard(props: MaterialUixCardProps) {
  const { icon, image, title, children, sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        minHeight: { xs: 563, sm: 600 },
        px: { xs: 3.5, sm: 7.5 },
        py: { xs: 5, sm: 6 },
        ...sx,
      }}
      {...other}
    >
      {image ? <img loading="lazy" width="178" height="170" src={image} alt="" /> : icon}
      <Typography variant="h3" sx={{ mt: { xs: 4, sm: 6 } }}>
        {title}
      </Typography>
      <Typography component="div" variant="body2" sx={{ color: 'grey5A' }}>
        {children}
      </Typography>
    </Box>
  );
}
