import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';

const styles = {
  root: {
    border: 'solid 1px #d9d9d9',
    width: 360,
  },
};

const ListExampleSimple = () => (
  <div style={styles.root}>
    <List>
      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
      <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
      <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
    </List>
    <Divider />
    <List>
      <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
    </List>
  </div>
);

export default ListExampleSimple;
