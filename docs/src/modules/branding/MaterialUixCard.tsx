import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@material-ui/core/styles';

interface MaterialUixCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  sx?: BoxProps['sx'];
  title?: string;
}
const CustomBox = styled(Box)(({ theme }) => ({
  //   '&:first-child': {
  //   marginTop: '0px !important',
  // },
  '&:nth-child(even)': {
    marginTop: '60px',
    position: 'relative',
    top: '60px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  '&:nth-child(odd)': {
    marginTop: '-60px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  // }
}));
export default function MaterialUixCard(props: MaterialUixCardProps) {
  const { icon, image, title, children, sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        minHeight: { xs: 563, sm: 680 },
        px: { xs: 3.5, sm: 7.5 },
        py: { xs: 5, sm: 6 },
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 178 }}>
        {image ? <img loading="lazy" width="100%" src={image} alt="" /> : icon}
      </Box>
      <Typography variant="h3" sx={{ mt: { xs: 4, sm: 6 } }}>
        {title}
      </Typography>
      <Typography component="div" variant="body2" sx={{ color: 'grey5A' }}>
        {children}
      </Typography>
    </Box>
  );
}
