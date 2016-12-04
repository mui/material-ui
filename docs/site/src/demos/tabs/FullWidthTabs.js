// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

const TabContainer = (props) => (
  <div style={{ padding: 20 }}>
    {props.children}
  </div>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('FullWidthTabs', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  appBar: {
    backgroundColor: theme.palette.background.appBar,
  },
}));

export default class FullWidthTabs extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleChangeIndex = (index) => {
    this.setState({ index });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Paper style={{ width: 500 }}>
        <div className={classes.appBar}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            textColor="accent"
            fullWidth
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </div>
        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>{'Item One'}</TabContainer>
          <TabContainer>{'Item Two'}</TabContainer>
          <TabContainer>{'Item Three'}</TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}
