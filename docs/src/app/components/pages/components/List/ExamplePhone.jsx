import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CommunicationCall from 'material-ui/lib/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import Colors from 'material-ui/lib/styles/colors';
import CommunicationEmail from 'material-ui/lib/svg-icons/communication/email';

const styles = {
  root: {
    border: 'solid 1px #d9d9d9',
    width: 360,
  },
};

const ListExamplePhone = () => (
  <div style={styles.root}>
    <List>
      <ListItem
        leftIcon={<CommunicationCall color={Colors.indigo500} />}
        rightIcon={<CommunicationChatBubble />}
        primaryText="(650) 555 - 1234"
        secondaryText="Mobile"
      />
      <ListItem
        insetChildren={true}
        rightIcon={<CommunicationChatBubble />}
        primaryText="(323) 555 - 6789"
        secondaryText="Work"
      />
    </List>
    <Divider inset={true} />
    <List>
      <ListItem
        leftIcon={<CommunicationEmail color={Colors.indigo500} />}
        primaryText="aliconnors@example.com"
        secondaryText="Personal"
      />
      <ListItem
        insetChildren={true}
        primaryText="ali_connors@example.com"
        secondaryText="Work"
      />
    </List>
  </div>
);

export default ListExamplePhone;
