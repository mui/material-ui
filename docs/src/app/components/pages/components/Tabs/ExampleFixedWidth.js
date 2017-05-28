import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const TabsExampleFixedWidth = () => (
  <Tabs fixedTabWidth={200}>
    <Tab label="Tab One" />
    <Tab label="Tab Two" />
    <Tab label="Tab Three" />
  </Tabs>
);

export default TabsExampleFixedWidth;
