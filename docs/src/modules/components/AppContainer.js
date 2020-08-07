import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 80 + 16,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}));

export default function AppContainer(props) {
  const { className, ...other } = props;
  const classes = useStyles();

  return (
    <Container
      component="main"
      id="main-content"
      maxWidth="md"
      tabIndex={-1}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
}

AppContainer.propTypes = {
  className: PropTypes.string,
};
