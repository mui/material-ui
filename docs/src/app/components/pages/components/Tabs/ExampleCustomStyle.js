import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './tab.css';

const TabsExampleCustomStyle = () => (
  <Tabs activeClassName="tab-active">
    <Tab label="Item One" >
      <div>
        <h2>Tab One</h2>
        <p>
          This is an example tab.
        </p>
        <p>
        </p>
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div>
        <h2>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab
      label="Item Three"
    >
      <div>
        <h2>Tab Three</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
);

export default TabsExampleCustomStyle;
