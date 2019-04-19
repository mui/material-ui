import React from 'react';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const Gtab = withStyles(theme => ({
  root: {
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 230,
    },
  },
  wrapper: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  labelIcon: {
    minHeight: 48,
  },
}))(Tab);

export default props => {
  return <Gtab disableRipple {...props} />;
};
