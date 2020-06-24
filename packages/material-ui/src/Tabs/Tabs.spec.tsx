import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';

function testOnChange() {
  function handleTabsChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Tabs onChange={handleTabsChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  <Tabs
    // @ts-expect-error internally it's either FocusEvent or ClickEvent
    onChange={handleElementChange}
  />;

  // this is structurally equal to `React.SyntheticEvent`
  // It works but we don't recommend it since it has some non-structural implications: changeEvent.target === changeEvent.currentTarget
  function handleChange(event: React.ChangeEvent<{}>) {}
  <Tabs onChange={handleChange} />;
}
