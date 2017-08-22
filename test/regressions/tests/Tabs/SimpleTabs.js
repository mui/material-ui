// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const styles = (theme: Object) => ({
  root: {
    width: 600,
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
});

function SimpleTabs(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.appBar}>
        <Tabs value={0}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" disabled />
        </Tabs>
      </Paper>
      <Paper className={classes.root}>
        <Tabs value={1} textColor="accent" centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" disabled />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs value={2} textColor="accent" fullWidth>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs value={0} textColor="accent" fullWidth>
          <Tab icon={<Icon>phone</Icon>} />
          <Tab icon={<Icon>favorite</Icon>} />
          <Tab icon={<Icon>person_pin</Icon>} disabled />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs value={1} fullWidth textColor="accent">
          <Tab icon={<Icon>phone</Icon>} label="RECENTS" />
          <Tab icon={<Icon>favorite</Icon>} label="FAVORITES" />
          <Tab icon={<Icon>person_pin</Icon>} label="NEARBY" disabled />
        </Tabs>
      </Paper>
    </div>
  );
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
