import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import React from 'react';

const styles = (theme) => ({
  root: {
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.h1.fontFamily,
    padding: theme.spacing(2, 4),
    fontSize: theme.typography.pxToRem(14),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
  },
  sizeSmall: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
  },
  sizeLarge: {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
  },
});

function Button(props) {
  return <MuiButton {...props} />;
}

export default withStyles(styles)(Button);
