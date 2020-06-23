import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';

function testOnChange() {
  function handleTabsChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Tabs onChange={handleTabsChange} />;

  function handleChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's either FocusEvent or ClickEvent
  <Tabs onChange={handleChange} />;
}
