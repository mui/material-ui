// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const styleSheet = createStyleSheet('SimpleTabs', (theme) => ({
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
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      <Paper className={classes.root}>
        <Tabs index={1} textColor="accent" centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
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
        <Tabs index={0} textColor="accent" fullWidth >
          <Tab icon={<span className="material-icons">phone</span>} />
          <Tab icon={<span className="material-icons">favorite</span>} />
          <Tab icon={<span className="material-icons">person_pin</span>} />
        </Tabs>
      </Paper>
      <Paper>
        <Tabs index={1} fullWidth textColor="accent">
          <Tab
            icon={<span className="material-icons">phone</span>}
            label="RECENTS"
          />
          <Tab
            icon={<span className="material-icons">favorite</span>}
            label="FAVORITES"
          />
          <Tab
            icon={<span className="material-icons">person_pin</span>}
            label="NEARBY"
          />
        </Tabs>
      </Paper>
    </div>
  );
}

SimpleTabs.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
