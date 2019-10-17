import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 80 + 16,
    flex: '1 1 100%',
    position: 'relative',
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
  ad: {
    '& .description': {
      marginBottom: 196,
    },
    '& .description.ad': {
      marginBottom: 40,
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
}));

export default function AppContent(props) {
  const { children, disableAd, disableToc } = props;
  const classes = useStyles();

  return (
    <Container
      component="main"
      id="main-content"
      tabIndex={-1}
      className={clsx(classes.root, {
        [classes.ad]: !disableAd,
        [classes.disableToc]: disableToc,
      })}
    >
      {children}
    </Container>
  );
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
};
