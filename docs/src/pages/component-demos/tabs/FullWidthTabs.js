// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

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

class FullWidthTabs extends Component {
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
    const classes = this.props.classes;

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

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FullWidthTabs);
