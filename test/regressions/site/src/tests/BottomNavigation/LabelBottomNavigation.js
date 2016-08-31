// @flow weak

import React from 'react';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

export default function LabelBottomNavigation() {
  return (
    <BottomNavigation index={0} showLabel={false}>
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
