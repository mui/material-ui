import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

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
