// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

const styleSheet = createStyleSheet('SimpleBottomNavigation', () => ({
  row: {
    flexGrow: 1,
  },
}));

export default class SimpleBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  handleChangeIndex = (index) => {
    this.setState({ selectedIndex: index });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { selectedIndex } = this.state;

    return (
      <div className={classes.row}>
        <BottomNavigation
          showLabel
          selectedIndex={selectedIndex}
          onChangeIndex={this.handleChangeIndex}
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
