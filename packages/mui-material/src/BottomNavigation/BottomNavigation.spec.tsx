import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';

function testOnChange() {
  function handleBottomNavigationChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <BottomNavigation onChange={handleBottomNavigationChange} />;

  function handleElementChange(event: React.ChangeEvent) {}

  <BottomNavigation
    // @ts-expect-error internally it's whatever even lead to a change in value
    onChange={handleElementChange}
  />;
}
