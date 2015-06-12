var React = require('react');
var mui = require('mui');
var ImageAvatar = mui.ImageAvatar;
var List = mui.List;
var ListItem = mui.ListItem;
var ComponentDoc = require('../../component-doc.jsx');
var MobileTearSheet = require('../../mobile-tear-sheet.jsx');
var ActionGrade = require('../../svg-icons/action-grade.jsx');
var ActionInfo = require('../../svg-icons/action-info.jsx');
var CommunicationChatBubble = require('../../svg-icons/communication-chat-bubble.jsx');
var ContentDrafts = require('../../svg-icons/content-drafts.jsx');
var ContentInbox = require('../../svg-icons/content-inbox.jsx');
var ContentSend = require('../../svg-icons/content-send.jsx');

class SnackbarPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    var code =
      '<List>\n' +
      '  <ListItem>Single Line</ListItem>\n' +
      '  <ListItem>Single Line</ListItem>\n' +
      '  <ListItem>Single Line</ListItem>\n' +
      '</List>';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'Can be an SvgIcon or a FontIcon element.'
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'Secondary text can be a string or element that contains the text that is displayed below the primary text.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'dismiss',
            header: 'Snackbar.dismiss()',
            desc: 'Hides the snackbar.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onActionTouchTap',
            header: 'function(e)',
            desc: 'Fired when the action button is touchtapped.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Lists"
        code={code}
        componentInfo={componentInfo}>

        <MobileTearSheet>
          <List showBottomDivider={true}>
            <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
            <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
            <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
            <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
          </List>
          <List>
            <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Recent chats" showBottomDivider={true}>
            <ListItem
              leftAvatar={<ImageAvatar src="images/ok-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Brendan Lim
            </ListItem>
            <ListItem
              leftAvatar={<ImageAvatar src="images/kolage-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Eric Hoffman
            </ListItem>
            <ListItem
              leftAvatar={<ImageAvatar src="images/uxceo-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Grace Ng
            </ListItem>
            <ListItem
              leftAvatar={<ImageAvatar src="images/kerem-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Kerem Suer
            </ListItem>
            <ListItem
              leftAvatar={<ImageAvatar src="images/raquelromanp-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Raquel Parrado
            </ListItem>
          </List>
          <List subheader="Previous chats">
            <ListItem
              leftAvatar={<ImageAvatar src="images/chexee-128.jpg" />}>
              Chelsea Otakan
            </ListItem>
            <ListItem
              leftAvatar={<ImageAvatar src="images/jsa-128.jpg" />}>
              James Anderson
            </ListItem>
          </List>
        </MobileTearSheet>

      </ComponentDoc>
    );
  }

}

module.exports = SnackbarPage;
