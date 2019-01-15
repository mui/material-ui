import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: `${theme.spacing.unit * 2 - 1}px ${theme.spacing.unit * 4}px`,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
  },
  sizeSmall: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    fontSize: theme.typography.pxToRem(13),
  },
  sizeLarge: {
    padding: `${theme.spacing.unit * 3 - 3}px ${theme.spacing.unit * 6}px`,
    fontSize: theme.typography.pxToRem(16),
  },
});

function Button(props) {
  return <MuiButton {...props} />;
}

export default withStyles(styles)(Button);
