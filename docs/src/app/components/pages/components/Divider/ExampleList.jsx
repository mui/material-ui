import React from 'react';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import MobileTearSheet from '../../../MobileTearSheet';

const DividerExampleList = () => (
  <MobileTearSheet height={250}>
    <List>
      <ListItem insetChildren={true} primaryText="Janet Perkins Bennet" />
      <ListItem insetChildren={true} primaryText="Peter Carlsson" />
    </List>
    <Divider inset={true} />
    <List>
      <ListItem insetChildren={true} primaryText="Aaron Bennet" />
      <ListItem insetChildren={true} primaryText="Abbey Christensen" />
    </List>
  </MobileTearSheet>
);

export default DividerExampleList;
