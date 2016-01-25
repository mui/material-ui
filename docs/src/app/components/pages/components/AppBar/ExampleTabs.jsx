import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
};

const AppBarExampleTabs = () => (
  <AppBar
    title="Title"
    style={styles.appBar}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  >
    <Tabs style={styles.tabs}>
      <Tab label="ALL" />
      <Tab label="CAMERA" />
      <Tab label="RECENT" />
    </Tabs>
  </AppBar>
);

export default AppBarExampleTabs;
