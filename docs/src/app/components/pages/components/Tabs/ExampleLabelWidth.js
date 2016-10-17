import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const TabsExampleLabelWidth = () => (
  <Tabs >
    <Tab labelWidth={100} label="100 width" />
    <Tab labelWidth={250} label="250 width" />
    <Tab labelWidth={400} label="400 width" />
  </Tabs>
);

export default TabsExampleLabelWidth;
