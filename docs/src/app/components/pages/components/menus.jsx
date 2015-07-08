let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let Menu = require('menus/menu');
let MenuItem = require('menus/menu-item');
let MenuDivider = require('menus/menu-divider');
let ComponentDoc = require('../../component-doc');

let ArrowDropRight = require('svg-icons/navigation-arrow-drop-right');
let ContentCopy = require('svg-icons/content/content-copy');
let ContentLink = require('svg-icons/content/link');
let Delete = require('svg-icons/action/delete');
let Download = require('svg-icons/file/file-download');
let PersonAdd = require('svg-icons/social/person-add');
let RemoveRedEye = require('svg-icons/image/remove-red-eye');

class MenusPage extends React.Component {

  render() {

    let code = `
    <Menu>
      <MenuItem>Maps</MenuItem>
      <MenuItem>Books</MenuItem>
      <MenuItem>Flights</MenuItem>
      <MenuItem>Apps</MenuItem>
    </Menu>

    <Menu desktop={true} width={320}>
      <MenuItem secondaryText="&#8984;B">Bold</MenuItem>
      <MenuItem secondaryText="&#8984;I">Italic</MenuItem>
      <MenuItem secondaryText="&#8984;U">Underline</MenuItem>
      <MenuItem secondaryText="Alt+Shift+5">Strikethrough</MenuItem>
      <MenuItem secondaryText="&#8984;.">Superscript</MenuItem>
      <MenuItem secondaryText="&#8984;,">Subscript</MenuItem>
      <MenuDivider />
      <MenuItem rightIcon={<ArrowDropRight />}>Paragraph styles</MenuItem>
      <MenuItem rightIcon={<ArrowDropRight />}>Align</MenuItem>
      <MenuItem rightIcon={<ArrowDropRight />}>Line spacing</MenuItem>
      <MenuItem rightIcon={<ArrowDropRight />}>Numbered list</MenuItem>
      <MenuItem rightIcon={<ArrowDropRight />}>List options</MenuItem>
      <MenuDivider />
      <MenuItem secondaryText="&#8984;/">Clear formatting</MenuItem>
    </Menu>
    `;

    let desc = null;

    let componentInfo = [
      {
        name: 'Menu Props',
        infoArray: [
          {
            name: 'autoWidth',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, the width will automatically be set according to the items inside the menu using the ' +
              'proper keyline increment.'
          },
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.'
          },
          {
            name: 'multiple',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the value can an array and allow the menu to be a multi-select.'
          },
          {
            name: 'open',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, the menu will be rendered open.'
          },
          {
            name: 'openDirection',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.'
          },
          {
            name: 'listStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying list style.'
          },
          {
            name: 'value',
            type: 'string or array',
            header: 'optional',
            desc: 'The value of the selected menu item. If passed in, this will make the menu ' +
              'a controlled component. This component also supports valueLink.'
          },
          {
            name: 'width',
            type: 'string or number',
            header: 'optional',
            desc: 'Sets the width of the menu. If not specified, the menu width will be dictated by its ' +
              'children. The rendered width will always be a keyline increment (64px for desktop, 56px otherwise).'
          }
        ]
      },
      {
        name: 'MenuItem Props',
        infoArray: [
          {
            name: 'checked',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, a left check mark will be rendered'
          },
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.'
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'Disables a menu item.'
          },
          {
            name: 'innerDivStyle',
            type: 'object',
            header: 'optional',
            desc: 'Style overrides for the inner div.'
          },
          {
            name: 'insetChildren',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the children will be indented. Only needed when there is no leftIcon.'
          },
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the left side.'
          },
          {
            name: 'rightIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the right side.'
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the secondary text. If a string is passed in, a ' +
              'div tag will be rendered.'
          },
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'The value of the menu item.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onItemTouchTap',
            header: 'function(e, item)',
            desc: 'Fired when a menu item is touchTapped.'
          },
          {
            name: 'onChange',
            header: 'function(e, value)',
            desc: 'Fired when a menu item is touchTapped and the menu item value ' +
              'is not equal to the current menu value.'
          }
        ]
      }
    ];

    let styles = {
      menu: {
        marginRight: 32,
        marginBottom: 32,
        float: 'left',
        position: 'relative',
        zIndex: 0
      },

      hr: {
        clear: 'both',
        border: 'none'
      }
    };

    return (
      <ComponentDoc
        name="Menus"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <ReactTransitionGroup>
          <Menu style={styles.menu}>
            <MenuItem>Maps</MenuItem>
            <MenuItem>Books</MenuItem>
            <MenuItem>Flights</MenuItem>
            <MenuItem>Apps</MenuItem>
          </Menu>

          <Menu style={styles.menu}>
            <MenuItem>Refresh</MenuItem>
            <MenuItem>Help &amp; feedback</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Sign out</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem>Home</MenuItem>
            <MenuItem>Back</MenuItem>
            <MenuItem disabled={true}>Forward</MenuItem>
            <MenuDivider />
            <MenuItem disabled={true}>Recently closed</MenuItem>
            <MenuItem disabled={true}>Google</MenuItem>
            <MenuItem>YouTube</MenuItem>
          </Menu>

          <Menu style={styles.menu}>
            <MenuItem leftIcon={<RemoveRedEye />}>Preview</MenuItem>
            <MenuItem leftIcon={<PersonAdd />}>Share</MenuItem>
            <MenuItem leftIcon={<ContentLink />}>Get link</MenuItem>
            <MenuDivider />
            <MenuItem leftIcon={<ContentCopy />}>Make a copy</MenuItem>
            <MenuItem leftIcon={<Download />}>Download</MenuItem>
            <MenuDivider />
            <MenuItem leftIcon={<Delete />}>Remove</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem>Undo</MenuItem>
            <MenuItem disabled={true}>Redo</MenuItem>
            <MenuDivider />
            <MenuItem disabled={true}>Cut</MenuItem>
            <MenuItem disabled={true}>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem>Untitled</MenuItem>
            <MenuItem>Using the z-axis to Solve Design Challenges</MenuItem>
            <MenuItem>An Extensive History of Dimensionality</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem>Untitled</MenuItem>
            <MenuItem>Using the z-axis to Solve Design Challenges</MenuItem>
            <MenuItem>An Extensive History of Dimensionality: the Abridged Edition</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem secondaryText="Cmnd + O">Open</MenuItem>
            <MenuItem secondaryText="Shift + V">Paste in place</MenuItem>
            <MenuItem secondaryText="Opt + Shift + Cmnd + I">Research</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem secondaryText="&#8984;O">Open</MenuItem>
            <MenuItem secondaryText="&#8679;&#8984;V">Paste in place</MenuItem>
            <MenuItem secondaryText="&#8997;&#8679;&#8984;I">Research</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem secondaryText="&#8984;B">Bold</MenuItem>
            <MenuItem secondaryText="&#8984;I">Italic</MenuItem>
            <MenuItem secondaryText="&#8984;U">Underline</MenuItem>
            <MenuItem secondaryText="Alt+Shift+5">Strikethrough</MenuItem>
            <MenuItem secondaryText="&#8984;.">Superscript</MenuItem>
            <MenuItem secondaryText="&#8984;,">Subscript</MenuItem>
            <MenuDivider />
            <MenuItem rightIcon={<ArrowDropRight />}>Paragraph styles</MenuItem>
            <MenuItem rightIcon={<ArrowDropRight />}>Align</MenuItem>
            <MenuItem rightIcon={<ArrowDropRight />}>Line spacing</MenuItem>
            <MenuItem rightIcon={<ArrowDropRight />}>Numbered list</MenuItem>
            <MenuItem rightIcon={<ArrowDropRight />}>List options</MenuItem>
            <MenuDivider />
            <MenuItem secondaryText="&#8984;/">Clear formatting</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true} width={320}>
            <MenuItem insetChildren={true}>Single</MenuItem>
            <MenuItem insetChildren={true}>1.15</MenuItem>
            <MenuItem insetChildren={true}>Double</MenuItem>
            <MenuItem checked={true} rightIcon={<ArrowDropRight />}>Custom: 1.2</MenuItem>
            <MenuItem secondaryText="&#8984;.">Superscript</MenuItem>
            <MenuItem secondaryText="&#8984;,">Subscript</MenuItem>
            <MenuDivider />
            <MenuItem>Add space before paragraph</MenuItem>
            <MenuItem>Add space after paragraph</MenuItem>
            <MenuDivider />
            <MenuItem>Custom spacing...</MenuItem>
          </Menu>

          <Menu style={styles.menu} desktop={true}>
            <MenuItem>Show</MenuItem>
            <MenuItem checked={true}>Grid lines</MenuItem>
            <MenuItem insetChildren={true}>Page breaks</MenuItem>
            <MenuItem checked={true}>Rules</MenuItem>
          </Menu>
        </ReactTransitionGroup>
      </ComponentDoc>
    );

  }

}

module.exports = MenusPage;
