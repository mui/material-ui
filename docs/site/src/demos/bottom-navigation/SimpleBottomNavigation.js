// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

const styleSheet = createStyleSheet('SimpleBottomNavigation', () => ({
  root: {
    width: 500,
  },
}));

export default class SimpleBottomNavigation extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { index } = this.state;

    return (
      <div className={classes.root}>
        <BottomNavigation
          index={index}
          onChange={this.handleChange}
          showLabel
        >
          <BottomNavigationButton
            label="Recents"
            icon={<span className="material-icons">restore</span>}
          />
          <BottomNavigationButton
            label="Favorites"
            icon={<span className="material-icons">favorite</span>}
          />
          <BottomNavigationButton
            label="Nearby"
            icon={<span className="material-icons">location_on</span>}
          />
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
