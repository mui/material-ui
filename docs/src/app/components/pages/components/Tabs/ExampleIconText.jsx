import React from 'react';
import {Tabs, Tab} from 'material-ui/lib/Tabs';
import FontIcon from 'material-ui/lib/FontIcon';

const TabsExampleIconText = () => (
  <Tabs>
    <Tab
      icon={<FontIcon className="material-icons">phone</FontIcon>}
      label="RECENTS"
    />
    <Tab
      icon={<FontIcon className="material-icons">favorite</FontIcon>}
      label="FAVORITES"
    />
    <Tab
      icon={<FontIcon className="material-icons">person_pin</FontIcon>}
      label="NEARBY"
    />
  </Tabs>
);

export default TabsExampleIconText;
