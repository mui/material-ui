const React = require('react');
const ReactTransitionGroup = require('react-addons-transition-group');
const Paper = require('paper');
const Menu = require('menus/menu');
const MenuItem = require('menus/menu-item');
const MenuDivider = require('menus/menu-divider');
const ComponentDoc = require('../../component-doc');

const ArrowDropRight = require('svg-icons/navigation-arrow-drop-right');
const ContentCopy = require('svg-icons/content/content-copy');
const ContentLink = require('svg-icons/content/link');
const Delete = require('svg-icons/action/delete');
const Download = require('svg-icons/file/file-download');
const PersonAdd = require('svg-icons/social/person-add');
const RemoveRedEye = require('svg-icons/image/remove-red-eye');
const Code = require('menus-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class MenusPage extends React.Component {

  render() {

    let desc = null;

    let componentInfo = [
      {
        name: 'Menu Props',
        infoArray: [
          {
            name: 'animated',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the menu will apply transitions when added it gets added to the DOM. In order for transitions ' +
              'to work, wrap the menu inside a ReactTransitionGroup.',
          },
          {
            name: 'autoWidth',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, the width will automatically be set according to the items inside the menu using the ' +
              'proper keyline increment.',
          },
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the menu\'s root element.',
          },
          {
            name: 'listStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying list style.',
          },
          {
            name: 'maxHeight',
            type: 'number',
            header: 'optional',
            desc: 'The maxHeight of the menu in pixels. If specified, the menu will scroll if larger than the maxHeight.',
          },
          {
            name: 'multiple',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the value can an array and allow the menu to be a multi-select.',
          },
          {
            name: 'openDirection',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.',
          },
          {
            name: 'value',
            type: 'string or array',
            header: 'optional',
            desc: 'The value of the selected menu item. If passed in, this will make the menu ' +
              'a controlled component. This component also supports valueLink.',
          },
          {
            name: 'width',
            type: 'string or number',
            header: 'optional',
            desc: 'Sets the width of the menu. If not specified, the menu width will be dictated by its ' +
              'children. The rendered width will always be a keyline increment (64px for desktop, 56px otherwise).',
          },
          {
            name: 'zDepth',
            type: 'oneOf [0,1,2,3,4,5]',
            header: 'optional',
            desc: 'Sets the width of the menu. If not specified, the menu width will be dictated by its ' +
              'children. The rendered width will always be a keyline increment (64px for desktop, 56px otherwise).',
          },
        ],
      },
      {
        name: 'MenuItem Props',
        infoArray: [
          {
            name: 'checked',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, a left check mark will be rendered',
          },
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.',
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'Disables a menu item.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the menu item\'s root element.',
          },
          {
            name: 'innerDivStyle',
            type: 'object',
            header: 'optional',
            desc: 'Style overrides for the inner div.',
          },
          {
            name: 'insetChildren',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the children will be indented. Only needed when there is no leftIcon.',
          },
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the left side.',
          },
          {
            name: 'primaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the primary text. If a string is passed in, a ' +
              'div tag will be rendered.',
          },
          {
            name: 'rightIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the right side.',
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the secondary text. If a string is passed in, a ' +
              'div tag will be rendered.',
          },
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'The value of the menu item.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onEscKeyDown',
            header: 'function(event)',
            desc: 'Fired when an Esc key is keyed down.',
          },
          {
            name: 'onItemTouchTap',
            header: 'function(event, item)',
            desc: 'Fired when a menu item is touchTapped.',
          },
          {
            name: 'onChange',
            header: 'function(event, value)',
            desc: 'Fired when a menu item is touchTapped and the menu item value ' +
              'is not equal to the current menu value.',
          },
        ],
      },
    ];

    let styles = {
      menu: {
        marginRight: 32,
        marginBottom: 32,
        float: 'left',
        position: 'relative',
        zIndex: 0,
      },

      hr: {
        clear: 'both',
        border: 'none',
      },
    };

    return (
      <ComponentDoc
        name="Menus"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst Menu = require(\'material-ui/lib/menus/menu\');\n' +
            'const MenuItem = require(\'material-ui/lib/menus/menu-item\');\n' +
            'const MenuDivider = require(\'material-ui/lib/menus/menu-divider\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <Menu style={styles.menu}>
            <MenuItem primaryText="Maps" />
            <MenuItem primaryText="Books" />
            <MenuItem primaryText="Flights" />
            <MenuItem primaryText="Apps" />
          </Menu>

          <Menu style={styles.menu}>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem primaryText="Back" />
            <MenuItem primaryText="Forward" disabled={true} />
            <MenuDivider />
            <MenuItem primaryText="Recently closed" disabled={true} />
            <MenuItem primaryText="Google" disabled={true} />
            <MenuItem primaryText="YouTube" />
          </Menu>

          <Menu style={styles.menu}>
            <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
            <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
            <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
            <MenuDivider />
            <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
            <MenuItem primaryText="Download" leftIcon={<Download />} />
            <MenuDivider />
            <MenuItem primaryText="Remove" leftIcon={<Delete />} />
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem primaryText="Undo" />
            <MenuItem primaryText="Redo" disabled={true} />
            <MenuDivider />
            <MenuItem primaryText="Cut" disabled={true} />
            <MenuItem primaryText="Copy" disabled={true} />
            <MenuItem primaryText="Paste" />
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem primaryText="Untitled" />
            <MenuItem primaryText="Using the z-axis to Solve Design Challenges" />
            <MenuItem primaryText="An Extensive History of Dimensionality" />
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem primaryText="Untitled" />
            <MenuItem primaryText="Using the z-axis to Solve Design Challenges" />
            <MenuItem primaryText="An Extensive History of Dimensionality: the Abridged Edition" />
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem primaryText="Open" secondaryText="Cmnd + O" />
            <MenuItem primaryText="Paste in place" secondaryText="Shift + V" />
            <MenuItem primaryText="Research" secondaryText="Opt + Shift + Cmnd + I" />
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem primaryText="Open" secondaryText="&#8984;O" />
            <MenuItem primaryText="Paste in place" secondaryText="&#8679;&#8984;V" />
            <MenuItem primaryText="Research" secondaryText="&#8997;&#8679;&#8984;I" />
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem primaryText="Bold" secondaryText="&#8984;B" />
            <MenuItem primaryText="Italic" secondaryText="&#8984;I" />
            <MenuItem primaryText="Underline" secondaryText="&#8984;U" />
            <MenuItem primaryText="Strikethrough" secondaryText="Alt+Shift+5" />
            <MenuItem primaryText="Superscript" secondaryText="&#8984;." />
            <MenuItem primaryText="Subscript" secondaryText="&#8984;," />
            <MenuDivider />
            <MenuItem primaryText="Paragraph styles" rightIcon={<ArrowDropRight />} />
            <MenuItem primaryText="Align" rightIcon={<ArrowDropRight />} />
            <MenuItem primaryText="Line spacing" rightIcon={<ArrowDropRight />} />
            <MenuItem primaryText="Numbered list" rightIcon={<ArrowDropRight />} />
            <MenuItem primaryText="List options" rightIcon={<ArrowDropRight />} />
            <MenuDivider />
            <MenuItem primaryText="Clear formatting" secondaryText="&#8984;/" />
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem primaryText="Single" insetChildren={true} />
            <MenuItem primaryText="1.15" insetChildren={true} />
            <MenuItem primaryText="Double" insetChildren={true} />
            <MenuItem primaryText="Custom: 1.2" checked={true} rightIcon={<ArrowDropRight />} />
            <MenuDivider />
            <MenuItem primaryText="Add space before paragraph" />
            <MenuItem primaryText="Add space after paragraph" />
            <MenuDivider />
            <MenuItem primaryText="Custom spacing..." />
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem primaryText="Show" />
            <MenuItem primaryText="Grid lines" checked={true} />
            <MenuItem primaryText="Page breaks" insetChildren={true} />
            <MenuItem primaryText="Rules" checked={true} />
          </Menu>
        </CodeExample>
      </ComponentDoc>
    );

  }

}
