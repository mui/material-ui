// @flow
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

const TabContainer = props =>
  <div style={{ padding: 20 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('ScrollableTabsButtonAuto', theme => ({
  root: {
    marginTop: 30,
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
}));

class ScrollableTabsButtonAuto extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Paper className={classes.root}>
        <div className={classes.appBar}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </div>
        {this.state.index === 0 && <TabContainer>{'Item One'}</TabContainer>}
        {this.state.index === 1 && <TabContainer>{'Item Two'}</TabContainer>}
        {this.state.index === 2 && <TabContainer>{'Item Three'}</TabContainer>}
        {this.state.index === 3 && <TabContainer>{'Item Four'}</TabContainer>}
        {this.state.index === 4 && <TabContainer>{'Item Five'}</TabContainer>}
        {this.state.index === 5 && <TabContainer>{'Item Six'}</TabContainer>}
        {this.state.index === 6 && <TabContainer>{'Item Seven'}</TabContainer>}
      </Paper>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ScrollableTabsButtonAuto);
