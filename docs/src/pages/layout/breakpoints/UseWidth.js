import React from 'react';
import { unstable_useWidth as useWidth } from '@material-ui/core/useWidth';
import { ThemeContext } from '@material-ui/styles/ThemeProvider';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useWidth/unstable_useMediaQuery';
import Typography from '@material-ui/core/Typography';

const components = {
  sm: 'em',
  md: 'u',
  lg: 'del',
};

export default function UseWidth() {
  const theme = React.useContext(ThemeContext);
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Typography variant="subtitle1">
      <span>{`Current match: ${match}`}</span>
    </Typography>
  );
}
