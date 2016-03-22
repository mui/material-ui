import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const ListExamplePhone = () => (
  <MobileTearSheet>
    <List>
      <ListItem
        leftIcon={<CommunicationCall color={indigo500} />}
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
        leftIcon={<CommunicationEmail color={indigo500} />}
        primaryText="aliconnors@example.com"
        secondaryText="Personal"
      />
      <ListItem
        insetChildren={true}
        primaryText="ali_connors@example.com"
        secondaryText="Work"
      />
    </List>
  </MobileTearSheet>
);

export default ListExamplePhone;
