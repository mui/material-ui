var React = require('react');
var mui = require('mui');
var ImageAvatar = mui.ImageAvatar;
var List = mui.List;
var ListItem = mui.ListItem;
var ComponentDoc = require('../../component-doc.jsx');
var ActionGrade = require('../../svg-icons/action-grade.jsx');
var ActionInfo = require('../../svg-icons/action-info.jsx');
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

    var containerStyle = {
      border: 'solid 1px #ddd',
      float: 'left',
      width: 358,
      marginBottom: 24,
      marginRight: 24
    };

    return (
      <ComponentDoc
        name="Lists"
        code={code}
        componentInfo={componentInfo}>

        <div style={containerStyle}>
          <List padTop={true} showBottomDivider={true}>
            <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
            <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
            <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
            <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
          </List>
          <List padTop={true}>
            <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
          </List>
        </div>
        <div style={containerStyle}>
          <List>
            <ListItem leftAvatar={<ImageAvatar src="images/kerem-128.jpg" />}>Kerem Suer</ListItem>
            <ListItem leftAvatar={<ImageAvatar src="images/raquelromanp-128.jpg" />}>Raquel Parrado</ListItem>
            <ListItem leftAvatar={<ImageAvatar src="images/kolage-128.jpg" />}>Eric Hoffman</ListItem>
            <ListItem leftAvatar={<ImageAvatar src="images/ok-128.jpg" />}>Brendan Lim</ListItem>
            <ListItem leftAvatar={<ImageAvatar src="images/uxceo-128.jpg" />}>Grace Ng</ListItem>
            <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
          </List>
        </div>

      </ComponentDoc>
    );
  }

}

module.exports = SnackbarPage;
