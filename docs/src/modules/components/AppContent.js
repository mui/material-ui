import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    paddingTop: 80 + 29,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      maxWidth: 'calc(100% - 167px)',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(9),
      maxWidth: 'calc(100% - 240px - 167px)',
    },
  },
});

function AppContent(props) {
  const { className, classes, children } = props;

  return <main className={clsx(classes.root, className)}>{children}</main>;
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppContent);
