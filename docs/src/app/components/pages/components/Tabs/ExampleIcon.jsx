import React from 'react';
import {Tabs, Tab} from 'material-ui/lib/Tabs';
import FontIcon from 'material-ui/lib/FontIcon';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';

const TabsExampleIcon = () => (
  <Tabs>
    <Tab icon={<FontIcon className="muidocs-icon-action-home" />} />
    <Tab icon={<ActionFlightTakeoff />} />
    <Tab icon={<FontIcon className="material-icons">favorite</FontIcon>} />
  </Tabs>
);

export default TabsExampleIcon;
