// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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

const styleSheet = createStyleSheet('BasicTabsWrappedLabel', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
}));

class BasicTabsWrappedLabel extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  }

  render() {
    const classes = this.props.classes;

    return (
      <Paper className={classes.root}>
        <div className={classes.appBar}>
          <Tabs index={this.state.index} onChange={this.handleChange}>
            <Tab label="New Arrivals in the Longest Text of Nonfiction" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </div>
        {this.state.index === 0 && <TabContainer>{'Item One'}</TabContainer>}
        {this.state.index === 1 && <TabContainer>{'Item Two'}</TabContainer>}
        {this.state.index === 2 && <TabContainer>{'Item Three'}</TabContainer>}
      </Paper>
    );
  }
}

BasicTabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(BasicTabsWrappedLabel);
