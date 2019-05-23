import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  root: {
    paddingTop: 80 + 16,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(1),
      maxWidth: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      maxWidth: 'calc(100% - 175px - 240px)',
    },
  },
  disableToc: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'calc(100%)',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'calc(100% - 240px)',
    },
  },
});

function AppContent(props) {
  const { className, classes, children, disableToc } = props;

  return (
    <Container
      component="main"
      id="main-content"
      tabIndex={-1}
      className={clsx(classes.root, className, {
        [classes.disableToc]: disableToc,
      })}
    >
      {children}
    </Container>
  );
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disableToc: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AppContent);
