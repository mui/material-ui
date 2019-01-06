import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: `${theme.spacing(2) - 1}px ${theme.spacing(4)}px`,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
  },
  sizeSmall: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    fontSize: theme.typography.pxToRem(13),
  },
  sizeLarge: {
    padding: `${theme.spacing(3) - 3}px ${theme.spacing(6)}px`,
    fontSize: theme.typography.pxToRem(16),
  },
});

function Button(props) {
  return <MuiButton {...props} />;
}

export default withStyles(styles)(Button);
