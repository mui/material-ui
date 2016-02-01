import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import IconButton from 'material-ui/lib/icon-button';

const ListExampleNested = () => (
  <MobileTearSheet>
    <List subheader="Nested List Items">
      <ListItem
        primaryText="Sent mail"
        leftIcon={<ContentSend />}
        rightIconButton={<IconButton iconClassName="material-icons">delete</IconButton>}
      />
      <ListItem
        primaryText="Drafts"
        leftIcon={<ContentDrafts />}
        rightIconButton={<IconButton iconClassName="material-icons">delete</IconButton>}
      />
      <ListItem
        primaryText="Inbox"
        leftIcon={<ContentInbox />}
        initiallyOpen={true}
        rightIconButton={<IconButton iconClassName="material-icons">delete</IconButton>}
        primaryTogglesNestedList={false}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="Starred"
            leftIcon={<ActionGrade />}
          />,
          <ListItem
            key={2}
            primaryText="Sent Mail"
            leftIcon={<ContentSend />}
            disabled={true}
            nestedItems={[
              <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
            ]}
          />,
        ]}
      />
    </List>
  </MobileTearSheet>
);

export default ListExampleNested;
