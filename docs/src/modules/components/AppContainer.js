import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 80 + 16,
    [theme.breakpoints.up('md')]: {
      // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
      // 120ch ≈ 960px (theme.breakpoints.values.md) using 16px Roboto
      // TODO Does it make sense to create breakpoints based on `ch`?
      maxWidth: '120ch',
    },
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
      id="main-content"
      maxWidth={false}
      tabIndex={-1}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
}

AppContainer.propTypes = {
  className: PropTypes.string,
};
