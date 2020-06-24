import * as React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';

function testOnChange() {
  function handleBottomNavigationChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <BottomNavigation onChange={handleBottomNavigationChange} />;

  function handleElementChange(event: React.ChangeEvent) {}

  <BottomNavigation
    // @ts-expect-error internally it's whatever even lead to a change in value
    onChange={handleElementChange}
  />;

  // this is structurally equal to `React.SyntheticEvent`
  // It works but we don't recommend it since it has some non-structural implications: changeEvent.target === changeEvent.currentTarget
  function handleChange(event: React.ChangeEvent<{}>) {}
  <BottomNavigation onChange={handleChange} />;
}
