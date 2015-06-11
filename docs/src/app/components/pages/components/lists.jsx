var React = require('react');
var mui = require('mui');
var List = mui.List;
var ListDivider = mui.ListDivider;
var ListItem = mui.ListItem;
var ComponentDoc = require('../../component-doc.jsx');

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

    var listStyle = {
      border: 'solid 1px #ddd',
      width: 360
    };

    return (
      <ComponentDoc
        name="Lists"
        code={code}
        componentInfo={componentInfo}>

        <List style={listStyle}>
          <ListItem>Inbox</ListItem>
          <ListItem>Starred</ListItem>
          <ListItem>Sent mail</ListItem>
          <ListItem>Drafts</ListItem>
          <ListDivider />
          <ListItem>All mail</ListItem>
          <ListItem>Trash</ListItem>
          <ListItem>Spam</ListItem>
          <ListItem>Follow up</ListItem>
        </List>

      </ComponentDoc>
    );
  }

}

module.exports = SnackbarPage;
