import * as React from 'react';
import { expectType } from '@mui/types';
import Tabs from '@mui/material/Tabs';
import SvgIcon from '@mui/material/SvgIcon';

function testOnChange() {
  function handleTabsChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Tabs onChange={handleTabsChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  <Tabs
    // @ts-expect-error internally it's either FocusEvent or ClickEvent
    onChange={handleElementChange}
  />;
}

function TabTest() {
  return <Tabs TabIndicatorProps={{ style: { backgroundColor: 'green' } }} />;
}

function TabIndicatorSxTest() {
  return <Tabs TabIndicatorProps={{ sx: {} }} />;
}

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// Test for slots and slotProps
<Tabs
  value={0}
  variant="scrollable"
  scrollButtons
  textColor="secondary"
  slots={{
    StartScrollButtonIcon: SampleIcon,
    EndScrollButtonIcon: SampleIcon,
  }}
  slotProps={{
    endScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonEnd',
      fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
    }),
    startScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonStart',
      fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
    }),
  }}
/>;

// Test for ref type
<Tabs
  ref={(elem) => {
    expectType<HTMLDivElement | null, typeof elem>(elem);
  }}
/>;
