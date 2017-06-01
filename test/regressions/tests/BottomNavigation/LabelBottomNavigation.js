// @flow

import React from 'react';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';

export default function LabelBottomNavigation() {
  return (
    <BottomNavigation index={0} showLabel={false}>
      <BottomNavigationButton label="Recents" icon={<Icon>restore</Icon>} />
      <BottomNavigationButton label="Favorites" icon={<Icon>favorite</Icon>} />
    </BottomNavigation>
  );
}
