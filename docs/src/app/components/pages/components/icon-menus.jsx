let React = require('react');
let { IconButton } = require('material-ui');
let IconMenu = require('menus/icon-menu');
let MenuItem = require('menus/menu-item');
let MenuDivider = require('menus/menu-divider');
let MoreVertIcon = require('svg-icons/navigation/more-vert');
let ComponentDoc = require('../../component-doc');

let ContentCopy = require('svg-icons/content/content-copy');
let ContentFilter = require('svg-icons/content/filter-list');
let ContentLink = require('svg-icons/content/link');
let Delete = require('svg-icons/action/delete');
let Download = require('svg-icons/file/file-download');
let MapsPlace = require('svg-icons/maps/place');
let PersonAdd = require('svg-icons/social/person-add');
let RemoveRedEye = require('svg-icons/image/remove-red-eye');


class IconMenus extends React.Component {

  constructor(props) {
    super(props);

    this._handleIconMenuChange = this._handleIconMenuChange.bind(this);
    this._handleIconMenuMultiChange = this._handleIconMenuMultiChange.bind(this);
    this._handleIconMenuValueLinkChange = this._handleIconMenuValueLinkChange.bind(this);
    this._handleIconMenuUsStateChange = this._handleIconMenuUsStateChange.bind(this);

    this.state = {
      iconMenuValue: '1',
      iconMenuMultiValue: ['2', '4'],
      iconMenuValueLink: '1',
      usState: 'TX'
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
          },
          {
            name: 'touchTapCloseDelay',
            type: 'number',
            header: 'default: 200',
            desc: 'Sets the delay in milliseconds before closing the menu when an item is clicked.'
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

    let iconButtonElement = <IconButton><MoreVertIcon /></IconButton>;
    let filterButtonElement = <IconButton><ContentFilter /></IconButton>;
    let mapsButtonElement = <IconButton><MapsPlace /></IconButton>;

    let iconMenuValueLink = {
      value: this.state.iconMenuValueLink,
      requestChange: this._handleIconMenuValueLinkChange
    };

    let usStateValueLink = {
      value: this.state.usState,
      requestChange: this._handleIconMenuUsStateChange
    };

    return (
      <ComponentDoc
        name="Icon Menus"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <br/>

        <p>Menu with various open directions
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
        </p>

        <p>Menu with value, valueLink, multiple values
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

          <IconMenu
            iconButtonElement={filterButtonElement}
            multiple={true}
            onChange={this._handleIconMenuMultiChange}
            openDirection="bottom-right"
            value={this.state.iconMenuMultiValue}>
            <MenuItem value="1">Blu-ray</MenuItem>
            <MenuItem value="2">Cassette</MenuItem>
            <MenuItem value="3">CD</MenuItem>
            <MenuItem value="4">DVD Audio</MenuItem>
            <MenuItem value="5">Hybrid SACD</MenuItem>
            <MenuItem value="6">Vinyl</MenuItem>
          </IconMenu>
        </p>

        <p>Menu Item variations
          <IconMenu
            iconButtonElement={iconButtonElement}
            openDirection="bottom-right">
            <MenuItem>Home</MenuItem>
            <MenuItem>Back</MenuItem>
            <MenuItem disabled={true}>Forward</MenuItem>
            <MenuDivider />
            <MenuItem disabled={true}>Recently closed</MenuItem>
            <MenuItem disabled={true}>Google</MenuItem>
            <MenuItem>YouTube</MenuItem>
          </IconMenu>

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

        <p>Scrollable

          <IconMenu
            iconButtonElement={mapsButtonElement}
            maxHeight={272}
            openDirection="bottom-right"
            valueLink={usStateValueLink}>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </IconMenu>

          <IconMenu
            iconButtonElement={mapsButtonElement}
            maxHeight={272}
            openDirection="bottom-left"
            valueLink={usStateValueLink}>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </IconMenu>

          <IconMenu
            iconButtonElement={mapsButtonElement}
            maxHeight={272}
            openDirection="top-right"
            valueLink={usStateValueLink}>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </IconMenu>

          <IconMenu
            iconButtonElement={mapsButtonElement}
            maxHeight={272}
            openDirection="top-left"
            valueLink={usStateValueLink}>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
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

  _handleIconMenuUsStateChange(e, value) {
    this.setState({
      usState: value
    });
  }

  _handleIconMenuValueLinkChange(e, value) {
    this.setState({
      iconMenuValueLink: value
    });
  }

}

module.exports = IconMenus;
