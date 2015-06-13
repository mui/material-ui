var React = require('react');
var mui = require('mui');
var Avatar = mui.Avatar;
var Checkbox = mui.Checkbox;
var Colors = mui.Styles.Colors;
var List = mui.List;
var ListDivider = mui.ListDivider;
var ListItem = mui.ListItem;
var ComponentDoc = require('../../component-doc.jsx');
var MobileTearSheet = require('../../mobile-tear-sheet.jsx');
var ActionAssignment = require('../../svg-icons/action-assignment.jsx');
var ActionGrade = require('../../svg-icons/action-grade.jsx');
var ActionInfo = require('../../svg-icons/action-info.jsx');
var CommunicationCall = require('../../svg-icons/communication-call.jsx');
var CommunicationChatBubble = require('../../svg-icons/communication-chat-bubble.jsx');
var CommunicationEmail = require('../../svg-icons/communication-email.jsx');
var ContentDrafts = require('../../svg-icons/content-drafts.jsx');
var ContentInbox = require('../../svg-icons/content-inbox.jsx');
var ContentSend = require('../../svg-icons/content-send.jsx');
var EditorInsertChart = require('../../svg-icons/editor-insert-chart.jsx');
var FileFolder = require('../../svg-icons/file-folder.jsx');
var ToggleStarBorder = require('../../svg-icons/toggle-star-border.jsx');

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
          <List>
            <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
            <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
            <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
            <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
          </List>
          <ListDivider />
          <List>
            <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Recent chats">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Brendan Lim
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Eric Hoffman
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Grace Ng
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Kerem Suer
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Raquel Parrado
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Previous chats">
            <ListItem
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}>
              Chelsea Otakan
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}>
              James Anderson
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Folders" insetSubheader={true}>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 9, 2014">
              Photos
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 17, 2014">
              Recipes
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 28, 2014">
              Work
            </ListItem>
          </List>
          <ListDivider inset={true} />
          <List subheader="Files" insetSubheader={true}>
            <ListItem
              leftAvatar={<Avatar icon={<ActionAssignment />} iconBgColor={Colors.blue500} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 20, 2014">
              Vacation itinerary
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<EditorInsertChart />} iconBgColor={Colors.yellow600} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 10, 2014">
              Kitchen remodel
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="General">
            <ListItem
              secondaryText="Change your Google+ profile photo">
              Profile photo
            </ListItem>
            <ListItem
              secondaryText="Your status is visible to everyone you use with">
              Show your status
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Hangout notifications">
            <ListItem
              disableTouchTap={true}
              leftIcon={<Checkbox />}
              secondaryText="Allow notifications">
              Notifications
            </ListItem>
            <ListItem
              disableTouchTap={true}
              leftIcon={<Checkbox />}
              secondaryText="Hangouts message">
              Sounds
            </ListItem>
            <ListItem
              disableTouchTap={true}
              leftIcon={<Checkbox />}
              secondaryText="Hangouts video call">
              Video sounds
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List>
            <ListItem
              leftIcon={<CommunicationCall style={{fill: Colors.indigo500}} />}
              rightIcon={<CommunicationChatBubble />}
              secondaryText="Mobile">
              (650) 555 - 1234
            </ListItem>
            <ListItem
              insetChildren={true}
              rightIcon={<CommunicationChatBubble />}
              secondaryText="Work">
              (323) 555-6789
            </ListItem>
          </List>
          <ListDivider inset={true} />
          <List>
            <ListItem
              leftIcon={<CommunicationEmail style={{fill: Colors.indigo500}} />}
              secondaryText="Personal">
              aliconnors@example.com
            </ListItem>
            <ListItem
              insetChildren={true}
              secondaryText="Work">
              ali_connors@example.com
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Brendan Lim</span> -- I&apos;ll be in your neighborhood this weekend.</p>}>
              Brunch this weekend?
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> -- Wish I could but I can</p>}>
              Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span>
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Grace Ng</span> -- Do you have Paris recommendations?</p>}>
              Oui oui
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Kerem Suer</span> -- Do you have any ideas on what I</p>}>
              Birthday gift
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Raquel Parrado</span> -- We should eat this: grated cheese</p>}>
              Recipe to try
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Chelsea Otakan</span> -- Any interest in seeing the Giants</p>}>
              Giants game
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Brendan Lim</span> -- I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
              secondaryTextLines={2}>
              Brunch this weekend?
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> -- Wish I could come, but I&apos;m out of town this weekend.</p>}
              secondaryTextLines={2}>
              Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span>
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Grace Ng</span> -- Do you have Paris recommendations? Have you ever been?</p>}
              secondaryTextLines={2}>
              Oui oui
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Kerem Suer</span> -- Do you have any ideas what we can get Heidi for her birthday? How about a pony?</p>}
              secondaryTextLines={2}>
              Birthday gift
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Raquel Parrado</span> -- We should eat this: grated squash. Corn and tomatillo tacos.</p>}
              secondaryTextLines={2}>
              Recipe to try
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIcon={<ToggleStarBorder />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>}
              secondaryTextLines={2}>
              Brendan Lim
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              rightIcon={<ToggleStarBorder />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>Wish I could come, but I&apos;m out of town this weekend.</p>}
              secondaryTextLines={2}>
              me, Scott, Jennifer
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              rightIcon={<ToggleStarBorder />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Oui oui</span><br/>Do you have any Paris recs? Have you ever been?</p>}
              secondaryTextLines={2}>
              Grace Ng
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              rightIcon={<ToggleStarBorder />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>Do you have any ideas what we can get Heidi for her birthday? How about a pony?</p>}
              secondaryTextLines={2}>
              Kerem Suer
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              rightIcon={<ToggleStarBorder />}
              secondaryText={<p><span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>We should eat this: grated squash. Corn and tomatillo tacos.</p>}
              secondaryTextLines={2}>
              Raquel Parrado
            </ListItem>
          </List>
        </MobileTearSheet>

      </ComponentDoc>
    );
  }

}

module.exports = SnackbarPage;
