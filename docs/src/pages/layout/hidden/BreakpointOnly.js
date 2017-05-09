// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('BreakpointOnly', (theme) => ({
  container: {
    flexGrow: 1,
    paddingTop: 30,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 54,
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
    margin: 12,
  },
  typography: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
  },
}));

function BreakpointOnly(props) {
  const classes = props.classes;

  return (
    <div className={classes.container}>
      <Typography type="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Hidden only="lg">
        <Paper className={classes.paper}>Hidden on lg</Paper>
      </Hidden>
      <Hidden only="sm">
        <Paper className={classes.paper}>Hidden on sm</Paper>
      </Hidden>
      <Hidden only={['sm', 'lg']}>
        <Paper className={classes.paper}>Hidden on sm and lg</Paper>
      </Hidden>
    </div>
  );
}

BreakpointOnly.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

export default compose(
  withStyles(styleSheet),
  withWidth(),
)(BreakpointOnly);
