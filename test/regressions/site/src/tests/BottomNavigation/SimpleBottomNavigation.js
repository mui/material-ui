// @flow weak

import React from 'react';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

export default function SimpleBottomNavigation() {
  return (
    <BottomNavigation selectedIndex={0} showLabel>
      <BottomNavigationButton
        label="Recents"
        icon={<span className="material-icons">restore</span>}
      />
      <BottomNavigationButton
        label="Favorites"
        icon={<span className="material-icons">favorite</span>}
      />
    </BottomNavigation>
  );
}
