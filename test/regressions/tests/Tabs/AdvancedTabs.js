// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const styleSheet = createStyleSheet('AdvancedTabs', theme => ({
  root: {
    width: 600,
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
}));

function AdvancedTabs(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.appBar}>
        <Tabs index={0}>
          <Tab label="New Arrivals in the Longest Text of Nonfiction" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      <Paper className={classes.appBar}>
        <Tabs index={1} scrollable scrollButtons="auto">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Paper>
      <Paper className={classes.root}>
        <Tabs index={0} scrollable scrollButtons="on" textColor="accent">
          <Tab label="Item One" icon={<Icon>phone</Icon>} />
          <Tab label="Item Two" icon={<Icon>favorite</Icon>} />
          <Tab label="Item Three" icon={<Icon>person_pin</Icon>} />
          <Tab label="Item Four" icon={<Icon>help</Icon>} />
          <Tab label="Item Five" icon={<Icon>shopping_basket</Icon>} />
          <Tab label="Item Six" icon={<Icon>thumb_down</Icon>} />
          <Tab label="Item Seven" icon={<Icon>thumb_up</Icon>} />
        </Tabs>
      </Paper>
      <Paper className={classes.appBar}>
        <Tabs index={0} scrollable scrollButtons="off">
          <Tab icon={<Icon>phone</Icon>} />
          <Tab icon={<Icon>favorite</Icon>} />
          <Tab icon={<Icon>person_pin</Icon>} />
          <Tab icon={<Icon>help</Icon>} />
          <Tab icon={<Icon>shopping_basket</Icon>} />
          <Tab icon={<Icon>thumb_down</Icon>} />
          <Tab icon={<Icon>thumb_up</Icon>} />
        </Tabs>
      </Paper>
    </div>
  );
}

AdvancedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AdvancedTabs);
