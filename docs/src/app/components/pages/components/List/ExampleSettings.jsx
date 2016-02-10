import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Subheader from 'material-ui/lib/Subheader';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

const styles = {
  root: {
    border: 'solid 1px #d9d9d9',
    width: 360,
  },
  divider: {
    height: 30,
  },
};

const ListExampleSettings = () => (
  <div>
    <div style={styles.root}>
      <List>
        <Subheader>General</Subheader>
        <ListItem
          primaryText="Profile photo"
          secondaryText="Change your Google+ profile photo"
        />
        <ListItem
          primaryText="Show your status"
          secondaryText="Your status is visible to everyone you use with"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Notifications"
          secondaryText="Allow notifications"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Sounds"
          secondaryText="Hangouts message"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Video sounds"
          secondaryText="Hangouts video call"
        />
      </List>
    </div>
    <div style={styles.divider} />
    <div style={styles.root}>
      <List>
        <ListItem
          primaryText="When calls and notifications arrive"
          secondaryText="Always interrupt"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Priority Interruptions</Subheader>
        <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
        <ListItem primaryText="Calls" rightToggle={<Toggle />} />
        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
      </List>
    </div>
  </div>
);

export default ListExampleSettings;
