import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function CustomSeparatorText(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs separatorText="›">
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>
      <br />
      <Paper className={classes.paper}>
        <Breadcrumbs separatorText="-">
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

CustomSeparatorText.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomSeparatorText);
