/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

function TabContainer(props) {
  return (
    <div style={{ padding: 20 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  static defaultProps: $FlowFixMeProps;
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
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
        </AppBar>
        {value === 0 &&
          <TabContainer>
            {'Item One'}
          </TabContainer>}
        {value === 1 &&
          <TabContainer>
            {'Item Two'}
          </TabContainer>}
        {value === 2 &&
          <TabContainer>
            {'Item Three'}
          </TabContainer>}
        {value === 3 &&
          <TabContainer>
            {'Item Four'}
          </TabContainer>}
        {value === 4 &&
          <TabContainer>
            {'Item Five'}
          </TabContainer>}
        {value === 5 &&
          <TabContainer>
            {'Item Six'}
          </TabContainer>}
        {value === 6 &&
          <TabContainer>
            {'Item Seven'}
          </TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
