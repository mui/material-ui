// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('BreakpointUp', (theme) => ({
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

function BreakpointUp(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.container}>
      <Typography type="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Hidden
        xsUp
        component={<Paper className={classes.paper}>xsUp</Paper>}
      />
      <Hidden
        smUp
        component={<Paper className={classes.paper}>smUp</Paper>}
      />
      <Hidden
        mdUp
        component={<Paper className={classes.paper}>mdUp</Paper>}
      />
      <Hidden
        lgUp
        component={<Paper className={classes.paper}>lgUp</Paper>}
      />
      <Hidden
        xlUp
        component={<Paper className={classes.paper}>xlUp</Paper>}
      />
    </div>
  );
}

BreakpointUp.propTypes = {
  width: PropTypes.string,
};

BreakpointUp.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default withWidth()(BreakpointUp);
