import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsSticky() {
  const [sticky, setSticky] = React.useState('top');
  const items = [
    <TabList
      key="tablist"
      sticky={sticky}
      variant="soft"
      underlinePlacement={{ top: 'bottom', bottom: 'top' }[sticky]}
    >
      <Tab indicatorPlacement={{ top: 'bottom', bottom: 'top' }[sticky]} value="top">
        Sticky top
      </Tab>
      <Tab
        indicatorPlacement={{ top: 'bottom', bottom: 'top' }[sticky]}
        value="bottom"
      >
        Sticky bottom
      </Tab>
    </TabList>,
    <div key="tabpanel">
      {[...new Array(50)].map((_, index) => (
        <div key={index}>Long content</div>
      ))}
    </div>,
  ];
  return (
    <Tabs
      aria-label="Sticky tabs"
      value={sticky}
      onChange={(event, newValue) => setSticky(newValue)}
      sx={{ p: 1, maxHeight: 200, overflowY: 'auto' }}
    >
      {sticky === 'top' ? items : items.reverse()}
    </Tabs>
  );
}
