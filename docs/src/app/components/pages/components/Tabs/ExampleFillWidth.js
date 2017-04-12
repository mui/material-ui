import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    fontWeight: 400,
    marginBottom: 12,
    paddingTop: 16,
  },
};

const TabsExampleFillWidth = () => (
  <Tabs fillWidth={true}>
    <Tab label="Item One">
      <div>
        <h2 style={styles.headline}>Tab One</h2>
        <p>
          {'This is an example tab.'}
        </p>
        <p>
          {'You can put any sort of HTML or React component in here. '}
          {'It even keeps the component state!'}
        </p>
      </div>
    </Tab>

    <Tab label="Item Two">
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          {'This is another example tab.'}
        </p>
      </div>
    </Tab>
  </Tabs>
);

export default TabsExampleFillWidth;
