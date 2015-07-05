let React = require('react');
let { IconButton } = require('material-ui');
let IconMenu = require('menus/icon-menu');
let MenuItem = require('menus/menu-item');
let MenuDivider = require('menus/menu-divider');
let MoreVertIcon = require('svg-icons/navigation/more-vert');
let ComponentDoc = require('../../component-doc');

let ContentCopy = require('svg-icons/content/content-copy');
let ContentLink = require('svg-icons/content/link');
let Delete = require('svg-icons/action/delete');
let Download = require('svg-icons/file/file-download');
let PersonAdd = require('svg-icons/social/person-add');
let RemoveRedEye = require('svg-icons/image/remove-red-eye');


class IconMenus extends React.Component {

  constructor(props) {
    super(props);

    this._handleIconMenuChange = this._handleIconMenuChange.bind(this);
    this._handleIconMenuMultiChange = this._handleIconMenuMultiChange.bind(this);
    this._handleIconMenuValueLinkChange = this._handleIconMenuValueLinkChange.bind(this);

    this.state = {
      iconMenuValue: '1',
      iconMenuMultiValue: ['2', '4'],
      iconMenuValueLink: '1'
    };
  }

  render() {

    let code = `
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Refresh</MenuItem>
      <MenuItem>Send Feedback More</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Help</MenuItem>
      <MenuItem>Sign out</MenuItem>
    </IconMenu>
    `;

    let desc = null;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.'
          },
          {
            name: 'iconButtonElement',
            type: 'element: IconButton',
            header: 'required',
            desc: 'This is the IconButton to render. This button will open the menu.'
          },
          {
            name: 'openDirection',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.'
          },
          {
            name: 'menuStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying menu style.'
          },
          {
            name: 'multiple',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the value can an array and allow the menu to be a multi-select.'
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
            desc: 'Sets the width of the menu. If not specified, the menu width ' +
              'will be dictated by its children. The rendered width will always be ' +
              'a keyline increment (64px for desktop, 56px otherwise).'
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

    let iconButtonElement = (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    );

    let iconMenuValueLink = {
      value: this.state.iconMenuValueLink,
      requestChange: this._handleIconMenuValueLinkChange
    };

    return (
      <ComponentDoc
        name="Icon Menus"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <br/>

        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          openDirection="bottom-right">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          openDirection="top-left">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          openDirection="top-right">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <br/><br/>

        <p>Menu with value
          <IconMenu
            iconButtonElement={iconButtonElement}
            onChange={this._handleIconMenuChange}
            openDirection="bottom-right"
            value={this.state.iconMenuValue}>
            <MenuItem value="1">Refresh</MenuItem>
            <MenuItem value="2">Send Feedback</MenuItem>
            <MenuItem value="3">Settings</MenuItem>
            <MenuItem value="4">Help</MenuItem>
            <MenuItem value="5">Sign out</MenuItem>
          </IconMenu>
        </p>

        <p>Menu with valueLink
          <IconMenu
            iconButtonElement={iconButtonElement}
            openDirection="bottom-right"
            valueLink={iconMenuValueLink}>
            <MenuItem value="1">Refresh</MenuItem>
            <MenuItem value="2">Send Feedback</MenuItem>
            <MenuItem value="3">Settings</MenuItem>
            <MenuItem value="4">Help</MenuItem>
            <MenuItem value="5">Sign out</MenuItem>
          </IconMenu>
        </p>

        <p>Menu with multiple values
          <IconMenu
            iconButtonElement={iconButtonElement}
            multiple={true}
            onChange={this._handleIconMenuMultiChange}
            openDirection="bottom-right"
            value={this.state.iconMenuMultiValue}>
            <MenuItem value="1">Refresh</MenuItem>
            <MenuItem value="2">Send Feedback</MenuItem>
            <MenuItem value="3">Settings</MenuItem>
            <MenuItem value="4">Help</MenuItem>
            <MenuItem value="5">Sign out</MenuItem>
          </IconMenu>
        </p>

        <p>Menu Item variations
          <IconMenu
            iconButtonElement={iconButtonElement}
            openDirection="bottom-right">
          <MenuItem leftIcon={<RemoveRedEye />}>Preview</MenuItem>
          <MenuItem leftIcon={<PersonAdd />}>Share</MenuItem>
          <MenuItem leftIcon={<ContentLink />}>Get link</MenuItem>
          <MenuDivider />
          <MenuItem leftIcon={<ContentCopy />}>Make a copy</MenuItem>
          <MenuItem leftIcon={<Download />}>Download</MenuItem>
          <MenuDivider />
          <MenuItem leftIcon={<Delete />}>Remove</MenuItem>
        </IconMenu>
        </p>

      </ComponentDoc>
    );

  }

  _handleIconMenuChange(e, value) {
    this.setState({
      iconMenuValue: value
    });
  }

  _handleIconMenuMultiChange(e, value) {
    this.setState({
      iconMenuMultiValue: value
    });
  }

  _handleIconMenuValueLinkChange(e, value) {
    this.setState({
      iconMenuValueLink: value
    });
  }

}

module.exports = IconMenus;
