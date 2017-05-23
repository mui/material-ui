// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const styleSheet = createStyleSheet('SimpleTabs', theme => ({
  root: {
    width: 600,
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
}));

export default function SimpleTabs(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Paper className={classes.appBar}>
        <Tabs index={0}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" disabled />
        </Tabs>
      </Paper>
      <Paper className={classes.root}>
        <Tabs index={1} textColor="accent" centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" disabled />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs index={2} textColor="accent" fullWidth>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs index={0} textColor="accent" fullWidth>
          <Tab icon={<Icon>phone</Icon>} />
          <Tab icon={<Icon>favorite</Icon>} />
          <Tab icon={<Icon>person_pin</Icon>} disabled />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs index={1} fullWidth textColor="accent">
          <Tab icon={<Icon>phone</Icon>} label="RECENTS" />
          <Tab icon={<Icon>favorite</Icon>} label="FAVORITES" />
          <Tab icon={<Icon>person_pin</Icon>} label="NEARBY" disabled />
        </Tabs>
      </Paper>
    </div>
  );
}

SimpleTabs.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
