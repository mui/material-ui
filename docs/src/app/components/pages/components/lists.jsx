const React = require('react');
const mui = require('material-ui');
const ComponentDoc = require('../../component-doc');
const MobileTearSheet = require('../../mobile-tear-sheet');
const ActionAssignment = require('svg-icons/action/assignment');
const ActionGrade = require('svg-icons/action/grade');
const ActionInfo = require('svg-icons/action/info');
const CommunicationCall = require('svg-icons/communication/call');
const CommunicationChatBubble = require('svg-icons/communication/chat-bubble');
const CommunicationEmail = require('svg-icons/communication/email');
const ContentDrafts = require('svg-icons/content/drafts');
const ContentInbox = require('svg-icons/content/inbox');
const ContentSend = require('svg-icons/content/send');
const EditorInsertChart = require('svg-icons/editor/insert-chart');
const FileFolder = require('svg-icons/file/folder');
const MoreVertIcon = require('svg-icons/navigation/more-vert');

const {
  Avatar,
  Checkbox,
  IconButton,
  List,
  ListDivider,
  ListItem,
  Styles,
  Toggle,
  Paper,
} = mui;

const IconMenu = require('menus/icon-menu');
const MenuItem = require('menus/menu-item');

const { Colors } = Styles;
const Code = require('lists-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class ListsPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let componentInfo = [
      {
        name: 'List Props',
        infoArray: [
          {
            name: 'insetSubheader',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the subheader will be indented by 72px.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the list\'s root element.',
          },
          {
            name: 'subheader',
            type: 'node',
            header: 'optional',
            desc: 'The subheader string that will be displayed at the top of the list.',
          },
          {
            name: 'subheaderStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to override subheader styles.',
          },
        ],
      },
      {
        name: 'ListItem Props',
        infoArray: [
          {
            name: 'autoGenerateNestedIndicator',
            type: 'bool',
            header: 'default: true',
            desc: 'Generate a nested list indicator icon when nested list items are detected. Set to false if you do not want an indicator auto-generated. Note that an indicator will not be created if a rightIcon/Button has been specified.',
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the list-item will not be clickable and will not display hover affects. This is automatically disabled if leftCheckbox or rightToggle is set.',
          },
          {
            name: 'insetChildren',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the children will be indented by 72px. Only needed if there is no left avatar or left icon.',
          },
          {
            name: 'leftAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the Avatar element to be displayed on the left side.',
          },
          {
            name: 'leftCheckbox',
            type: 'element',
            header: 'optional',
            desc: 'This is the Checkbox element to be displayed on the left side.',
          },
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the left side.',
          },
          {
            name: 'nestedItems',
            type: 'Array of elements',
            header: 'optional',
            desc: 'An array of ListItems to nest underneath the current ListItem.',
          },
          {
            name: 'nestedLevel',
            type: 'integer',
            header: 'optional',
            desc: 'Controls how deep a ListItem appears. This property is automatically managed so modify at your own risk.',
          },
          {
            name: 'initiallyOpen',
            type: 'boolean',
            header: 'default: false',
            desc: 'Controls whether or not the child ListItems are initially displayed.',
          },
          {
            name: 'primaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the primary text. If a string is passed in, a div ' +
              'tag will be rendered.',
          },
          {
            name: 'rightAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the avatar element to be displayed on the right side.',
          },
          {
            name: 'rightIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the right side.',
          },
          {
            name: 'rightIconButton',
            type: 'element',
            header: 'optional',
            desc: 'This is the IconButton to be displayed on the right side. Hovering over this button will ' +
              'remove the ListItem hover. Also, clicking on this button will not trigger a ListItem ripple. The ' +
              'event will be stopped and prevented from bubbling up to cause a ListItem click.',
          },
          {
            name: 'rightToggle',
            type: 'element',
            header: 'optional',
            desc: 'This is the Toggle element to display on the right side.',
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the secondary text. If a string is passed in, a div ' +
              'tag will be rendered.',
          },
          {
            name: 'secondaryTextLines',
            type: 'oneOf [1,2]',
            header: 'default: 1',
            desc: 'Can be 1 or 2. This is the number of secondary text lines before ellipsis will show.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the list item\'s root element.',
          },
        ],
      },
      {
        name: 'ListItem Events',
        infoArray: [
          {
            name: 'onKeyboardFocus',
            type: 'function(event, isKeyboardFocused)',
            header: 'optional',
            desc: 'Called when the ListItem has keyboard focus.',
          },
          {
            name: 'onMouseLeave',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when the mouse is no longer over the ListItem.',
          },
          {
            name: 'onMouseEnter',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when the mouse is over the ListItem.',
          },
          {
            name: 'onNestedListToggle',
            type: 'function(this)',
            header: 'optional',
            desc: 'Called when the ListItem toggles its nested ListItems.',
          },
          {
            name: 'onTouchStart',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when touches start.',
          },
          {
            name: 'onTouchTap',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when a touch tap event occures on the component.',
          },
        ],
      },
    ];

    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ComponentDoc
        name="Lists"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst List = require(\'material-ui/lib/lists/list\');\n' +
            'const ListDivider = require(\'material-ui/lib/lists/list-divider\');\n' +
            'const ListItem = require(\'material-ui/lib/lists/list-item\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <MobileTearSheet>
            <List>
              <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
              <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts"leftIcon={<ContentDrafts />} />
              <ListItem primaryText="Inbox"leftIcon={<ContentInbox />} />
            </List>
            <ListDivider />
            <List>
              <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Recent chats">
              <ListItem
                primaryText="Brendan Lim"
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Eric Hoffman"
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Grace Ng"
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Kerem Suer"
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Raquel Parrado"
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
            </List>
            <ListDivider />
            <List subheader="Previous chats">
              <ListItem
                primaryText="Chelsea Otakan"
                leftAvatar={<Avatar src="images/chexee-128.jpg" />} />
              <ListItem
                primaryText="James Anderson"
                leftAvatar={<Avatar src="images/jsa-128.jpg" />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List>
              <ListItem
                primaryText="Chelsea Otakan"
                leftIcon={<ActionGrade color={Colors.pinkA200} />}
                rightAvatar={<Avatar src="images/chexee-128.jpg" />} />
              <ListItem
                primaryText="Eric Hoffman"
                insetChildren={true}
                rightAvatar={<Avatar src="images/kolage-128.jpg" />} />
              <ListItem
                primaryText="James Anderson"
                insetChildren={true}
                rightAvatar={<Avatar src="images/jsa-128.jpg" />} />
              <ListItem
                primaryText="Kerem Suer"
                insetChildren={true}
                rightAvatar={<Avatar src="images/kerem-128.jpg" />} />
            </List>
            <ListDivider inset={true} />
            <List>
              <ListItem
                primaryText="Adelle Charles"
                leftAvatar={<Avatar color={Colors.pinkA200} backgroundColor={Colors.transparent} style={{left:8}}>A</Avatar>}
                rightAvatar={<Avatar src="images/adellecharles-128.jpg" />} />
              <ListItem
                primaryText="Adham Dannaway"
                insetChildren={true}
                rightAvatar={<Avatar src="images/adhamdannaway-128.jpg" />} />
              <ListItem
                primaryText="Allison Grayce"
                insetChildren={true}
                rightAvatar={<Avatar src="images/allisongrayce-128.jpg" />} />
              <ListItem
                primaryText="Angel Ceballos"
                insetChildren={true}
                rightAvatar={<Avatar src="images/angelceballos-128.jpg" />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Folders" insetSubheader={true}>
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Photos"
                secondaryText="Jan 9, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Recipes"
                secondaryText="Jan 17, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Work"
                secondaryText="Jan 28, 2014" />
            </List>
            <ListDivider inset={true} />
            <List subheader="Files" insetSubheader={true}>
              <ListItem
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={Colors.blue500} />}
                rightIcon={<ActionInfo />}
                primaryText="Vacation itinerary"
                secondaryText="Jan 20, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={Colors.yellow600} />}
                rightIcon={<ActionInfo />}
                primaryText="Kitchen remodel"
                secondaryText="Jan 10, 2014" />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List subheader="Nested List Items">
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
              <ListItem
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                nestedItems={[
                  <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />,
                  <ListItem
                    primaryText="Sent Mail"
                    leftIcon={<ContentSend />}
                    nestedItems={[
                      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                    ]}
                  />,
                ]}
              />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List subheader="General">
              <ListItem
                primaryText="Profile photo"
                secondaryText="Change your Google+ profile photo" />
              <ListItem
                primaryText="Show your status"
                secondaryText="Your status is visible to everyone you use with" />
            </List>
            <ListDivider />
            <List subheader="Hangout notifications">
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Notifications"
                secondaryText="Allow notifications" />
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Sounds"
                secondaryText="Hangouts message" />
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Video sounds"
                secondaryText="Hangouts video call" />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List>
              <ListItem
                primaryText="When calls and notifications arrive"
                secondaryText="Always interrupt" />
            </List>
            <ListDivider />
            <List subheader="Priority interruptions">
              <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
              <ListItem primaryText="Calls" rightToggle={<Toggle />} />
              <ListItem primaryText="Messages" rightToggle={<Toggle />} />
            </List>
            <ListDivider />
            <List subheader="Hangout notifications">
              <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List>
              <ListItem
                leftIcon={<CommunicationCall color={Colors.indigo500} />}
                rightIcon={<CommunicationChatBubble />}
                primaryText="(650) 555 - 1234"
                secondaryText="Mobile" />
              <ListItem
                insetChildren={true}
                rightIcon={<CommunicationChatBubble />}
                primaryText="(323) 555 - 6789"
                secondaryText="Work" />
            </List>
            <ListDivider inset={true} />
            <List>
              <ListItem
                leftIcon={<CommunicationEmail color={Colors.indigo500} />}
                primaryText="aliconnors@example.com"
                secondaryText="Personal" />
              <ListItem
                insetChildren={true}
                primaryText="ali_connors@example.com"
                secondaryText="Work" />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                primaryText="Brunch this weekend?"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                    I&apos;ll be in your neighborhood this weekend.
                  </p>
                } />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                primaryText={
                  <p>Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span></p>
                }
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                    Wish I could but I can
                  </p>
                } />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                primaryText="Oui oui"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                    Do you have Paris recommendations?
                  </p>
                } />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                primaryText="Birthday gift"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                    Do you have any ideas on what I
                  </p>
                } />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                primaryText="Recipe to try"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated cheese
                  </p>
                } />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/chexee-128.jpg" />}
                primaryText="Giants game"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Chelsea Otakan</span> --
                    Any interest in seeing the Giants
                  </p>
                } />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                primaryText="Brunch this weekend?"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                primaryText={
                  <p>Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span></p>
                }
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                    Wish I could come, but I&apos;m out of town this weekend.
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                primaryText="Oui oui"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                    Do you have Paris recommendations? Have you ever been?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                primaryText="Birdthday gift"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                primaryText="Recipe to try"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Brendan Lim"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="me, Scott, Jennifer"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
                    Wish I could come, but I&apos;m out of town this weekend.
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Grace Ng"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
                    Do you have any Paris recs? Have you ever been?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Kerem Suer"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                  </p>
                }
                secondaryTextLines={2} />
              <ListDivider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Raquel Parrado"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
            </List>
          </MobileTearSheet>
        </CodeExample>
      </ComponentDoc>
    );
  }

}
