// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('BreakpointDown', (theme) => ({
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

function BreakpointDown(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.container}>
      <Typography type="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Hidden
        xsDown
        component={<Paper className={classes.paper}>xsDown</Paper>}
      />
      <Hidden
        smDown
        component={<Paper className={classes.paper}>smDown</Paper>}
      />
      <Hidden
        mdDown
        component={<Paper className={classes.paper}>mdDown</Paper>}
      />
      <Hidden
        lgDown
        component={<Paper className={classes.paper}>lgDown</Paper>}
      />
      <Hidden
        xlDown
        component={<Paper className={classes.paper}>xlDown</Paper>}
      />
    </div>
  );
}

BreakpointDown.propTypes = {
  width: PropTypes.string,
};

BreakpointDown.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default withWidth()(BreakpointDown);
