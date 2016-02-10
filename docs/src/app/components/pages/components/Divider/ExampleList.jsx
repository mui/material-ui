import React from 'react';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const styles = {
  root: {
    border: 'solid 1px #d9d9d9',
    width: 360,
  },
};

const DividerExampleList = () => (
  <div style={styles.root}>
    <List>
      <ListItem insetChildren={true} primaryText="Janet Perkins Bennet" />
      <ListItem insetChildren={true} primaryText="Peter Carlsson" />
    </List>
    <Divider inset={true} />
    <List>
      <ListItem insetChildren={true} primaryText="Aaron Bennet" />
      <ListItem insetChildren={true} primaryText="Abbey Christensen" />
    </List>
  </div>
);

export default DividerExampleList;
