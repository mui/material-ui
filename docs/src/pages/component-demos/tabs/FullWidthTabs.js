// @flow
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const TabContainer = props =>
  <div style={{ padding: 24 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('FullWidthTabs', theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

class FullWidthTabs extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleChangeIndex = index => {
    this.setState({ index });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root} style={{ width: 500 }}>
        <AppBar position="static" color="default">
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>{'Item One'}</TabContainer>
          <TabContainer>{'Item Two'}</TabContainer>
          <TabContainer>{'Item Three'}</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FullWidthTabs);
