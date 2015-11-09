const React = require('react');
const { IconButton, Paper } = require('material-ui');
const IconMenu = require('menus/icon-menu');
const MenuItem = require('menus/menu-item');
const MenuDivider = require('menus/menu-divider');
const MoreVertIcon = require('svg-icons/navigation/more-vert');
const ComponentDoc = require('../../component-doc');

const ContentCopy = require('svg-icons/content/content-copy');
const ContentFilter = require('svg-icons/content/filter-list');
const ContentLink = require('svg-icons/content/link');
const Delete = require('svg-icons/action/delete');
const Download = require('svg-icons/file/file-download');
const MapsPlace = require('svg-icons/maps/place');
const PersonAdd = require('svg-icons/social/person-add');
const RemoveRedEye = require('svg-icons/image/remove-red-eye');
const Code = require('icon-menus-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class IconMenus extends React.Component {

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
      usState: 'TX',
    };
  }

  render() {

    let desc = null;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'closeOnItemTouchTap',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, menu will close after an item is touchTapped.',
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
            desc: 'Override the inline-styles of the icon menu\'s root element.',
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying icon style.',
          },
          {
            name: 'iconButtonElement',
            type: 'element: IconButton',
            header: 'required',
            desc: 'This is the IconButton to render. This button will open the menu.',
          },
          {
            name: 'openDirection',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.',
          },
          {
            name: 'menuStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying menu style.',
          },
          {
            name: 'multiple',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the value can an array and allow the menu to be a multi-select.',
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
            desc: 'Sets the width of the menu. If not specified, the menu width ' +
              'will be dictated by its children. The rendered width will always be ' +
              'a keyline increment (64px for desktop, 56px otherwise).',
          },
          {
            name: 'touchTapCloseDelay',
            type: 'number',
            header: 'default: 200',
            desc: 'Sets the delay in milliseconds before closing the menu when an item is clicked.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
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

    let iconButtonElement = <IconButton><MoreVertIcon /></IconButton>;
    let filterButtonElement = <IconButton><ContentFilter /></IconButton>;
    let mapsButtonElement = <IconButton><MapsPlace /></IconButton>;

    let iconMenuValueLink = {
      value: this.state.iconMenuValueLink,
      requestChange: this._handleIconMenuValueLinkChange,
    };

    let usStateValueLink = {
      value: this.state.usState,
      requestChange: this._handleIconMenuUsStateChange,
    };

    return (
      <ComponentDoc
        name="Icon Menus"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst IconMenu = require(\'material-ui/lib/menus/icon-menu\');\n' +
            'const MenuItem = require(\'material-ui/lib/menus/menu-item\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <br/>

          <p>Menu with various open directions</p>
          <div>
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>

            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="bottom-right">
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>

            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="top-left">
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>

            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="top-right">
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          </div>

          <p>Menu with value, valueLink, multiple values</p>
          <div>
            <IconMenu
              iconButtonElement={iconButtonElement}
              onChange={this._handleIconMenuChange}
              openDirection="bottom-right"
              value={this.state.iconMenuValue}>
              <MenuItem value="1" primaryText="Refresh" />
              <MenuItem value="2" primaryText="Send feedback" />
              <MenuItem value="3" primaryText="Settings" />
              <MenuItem value="4" primaryText="Help" />
              <MenuItem value="5" primaryText="Sign out" />
            </IconMenu>

            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="bottom-right"
              valueLink={iconMenuValueLink}>
              <MenuItem value="1" primaryText="Refresh" />
              <MenuItem value="2" primaryText="Send feedback" />
              <MenuItem value="3" primaryText="Settings" />
              <MenuItem value="4" primaryText="Help" />
              <MenuItem value="5" primaryText="Sign out" />
            </IconMenu>

            <IconMenu
              iconButtonElement={filterButtonElement}
              multiple={true}
              onChange={this._handleIconMenuMultiChange}
              openDirection="bottom-right"
              value={this.state.iconMenuMultiValue}>
              <MenuItem value="1" primaryText="Blu-ray" />
              <MenuItem value="2" primaryText="Cassette" />
              <MenuItem value="3" primaryText="CD" />
              <MenuItem value="4" primaryText="DVD Audio" />
              <MenuItem value="5" primaryText="Hybrid SACD" />
              <MenuItem value="6" primaryText="Vinyl" />
            </IconMenu>
          </div>

          <p>Menu Item variations</p>
          <div>
            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="bottom-right">
              <MenuItem primaryText="Home" />
              <MenuItem primaryText="Back" />
              <MenuItem primaryText="Forward" disabled={true} />
              <MenuDivider />
              <MenuItem primaryText="Recently closed" disabled={true} />
              <MenuItem primaryText="Google" disabled={true} />
              <MenuItem primaryText="YouTube" />
            </IconMenu>

            <IconMenu
              iconButtonElement={iconButtonElement}
              openDirection="bottom-right">
              <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
              <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
              <MenuItem primaryText="Get link" leftIcon={<ContentLink />} />
              <MenuDivider />
              <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
              <MenuItem primaryText="Download" leftIcon={<Download />} />
              <MenuDivider />
              <MenuItem primaryText="Remove" leftIcon={<Delete />} />
            </IconMenu>
          </div>

          <p>Scrollable</p>
          <div>
            <IconMenu
              iconButtonElement={mapsButtonElement}
              maxHeight={272}
              openDirection="bottom-right"
              valueLink={usStateValueLink}>
              <MenuItem value="AL" primaryText="Alabama" />
              <MenuItem value="AK" primaryText="Alaska" />
              <MenuItem value="AZ" primaryText="Arizona" />
              <MenuItem value="AR" primaryText="Arkansas" />
              <MenuItem value="CA" primaryText="California" />
              <MenuItem value="CO" primaryText="Colorado" />
              <MenuItem value="CT" primaryText="Connecticut" />
              <MenuItem value="DE" primaryText="Delaware" />
              <MenuItem value="DC" primaryText="District Of Columbia" />
              <MenuItem value="FL" primaryText="Florida" />
              <MenuItem value="GA" primaryText="Georgia" />
              <MenuItem value="HI" primaryText="Hawaii" />
              <MenuItem value="ID" primaryText="Idaho" />
              <MenuItem value="IL" primaryText="Illinois" />
              <MenuItem value="IN" primaryText="Indiana" />
              <MenuItem value="IA" primaryText="Iowa" />
              <MenuItem value="KS" primaryText="Kansas" />
              <MenuItem value="KY" primaryText="Kentucky" />
              <MenuItem value="LA" primaryText="Louisiana" />
              <MenuItem value="ME" primaryText="Maine" />
              <MenuItem value="MD" primaryText="Maryland" />
              <MenuItem value="MA" primaryText="Massachusetts" />
              <MenuItem value="MI" primaryText="Michigan" />
              <MenuItem value="MN" primaryText="Minnesota" />
              <MenuItem value="MS" primaryText="Mississippi" />
              <MenuItem value="MO" primaryText="Missouri" />
              <MenuItem value="MT" primaryText="Montana" />
              <MenuItem value="NE" primaryText="Nebraska" />
              <MenuItem value="NV" primaryText="Nevada" />
              <MenuItem value="NH" primaryText="New Hampshire" />
              <MenuItem value="NJ" primaryText="New Jersey" />
              <MenuItem value="NM" primaryText="New Mexico" />
              <MenuItem value="NY" primaryText="New York" />
              <MenuItem value="NC" primaryText="North Carolina" />
              <MenuItem value="ND" primaryText="North Dakota" />
              <MenuItem value="OH" primaryText="Ohio" />
              <MenuItem value="OK" primaryText="Oklahoma" />
              <MenuItem value="OR" primaryText="Oregon" />
              <MenuItem value="PA" primaryText="Pennsylvania" />
              <MenuItem value="RI" primaryText="Rhode Island" />
              <MenuItem value="SC" primaryText="South Carolina" />
              <MenuItem value="SD" primaryText="South Dakota" />
              <MenuItem value="TN" primaryText="Tennessee" />
              <MenuItem value="TX" primaryText="Texas" />
              <MenuItem value="UT" primaryText="Utah" />
              <MenuItem value="VT" primaryText="Vermont" />
              <MenuItem value="VA" primaryText="Virginia" />
              <MenuItem value="WA" primaryText="Washington" />
              <MenuItem value="WV" primaryText="West Virginia" />
              <MenuItem value="WI" primaryText="Wisconsin" />
              <MenuItem value="WY" primaryText="Wyoming" />
            </IconMenu>

            <IconMenu
              iconButtonElement={mapsButtonElement}
              maxHeight={272}
              openDirection="bottom-left"
              valueLink={usStateValueLink}>
              <MenuItem value="AL" primaryText="Alabama" />
              <MenuItem value="AK" primaryText="Alaska" />
              <MenuItem value="AZ" primaryText="Arizona" />
              <MenuItem value="AR" primaryText="Arkansas" />
              <MenuItem value="CA" primaryText="California" />
              <MenuItem value="CO" primaryText="Colorado" />
              <MenuItem value="CT" primaryText="Connecticut" />
              <MenuItem value="DE" primaryText="Delaware" />
              <MenuItem value="DC" primaryText="District Of Columbia" />
              <MenuItem value="FL" primaryText="Florida" />
              <MenuItem value="GA" primaryText="Georgia" />
              <MenuItem value="HI" primaryText="Hawaii" />
              <MenuItem value="ID" primaryText="Idaho" />
              <MenuItem value="IL" primaryText="Illinois" />
              <MenuItem value="IN" primaryText="Indiana" />
              <MenuItem value="IA" primaryText="Iowa" />
              <MenuItem value="KS" primaryText="Kansas" />
              <MenuItem value="KY" primaryText="Kentucky" />
              <MenuItem value="LA" primaryText="Louisiana" />
              <MenuItem value="ME" primaryText="Maine" />
              <MenuItem value="MD" primaryText="Maryland" />
              <MenuItem value="MA" primaryText="Massachusetts" />
              <MenuItem value="MI" primaryText="Michigan" />
              <MenuItem value="MN" primaryText="Minnesota" />
              <MenuItem value="MS" primaryText="Mississippi" />
              <MenuItem value="MO" primaryText="Missouri" />
              <MenuItem value="MT" primaryText="Montana" />
              <MenuItem value="NE" primaryText="Nebraska" />
              <MenuItem value="NV" primaryText="Nevada" />
              <MenuItem value="NH" primaryText="New Hampshire" />
              <MenuItem value="NJ" primaryText="New Jersey" />
              <MenuItem value="NM" primaryText="New Mexico" />
              <MenuItem value="NY" primaryText="New York" />
              <MenuItem value="NC" primaryText="North Carolina" />
              <MenuItem value="ND" primaryText="North Dakota" />
              <MenuItem value="OH" primaryText="Ohio" />
              <MenuItem value="OK" primaryText="Oklahoma" />
              <MenuItem value="OR" primaryText="Oregon" />
              <MenuItem value="PA" primaryText="Pennsylvania" />
              <MenuItem value="RI" primaryText="Rhode Island" />
              <MenuItem value="SC" primaryText="South Carolina" />
              <MenuItem value="SD" primaryText="South Dakota" />
              <MenuItem value="TN" primaryText="Tennessee" />
              <MenuItem value="TX" primaryText="Texas" />
              <MenuItem value="UT" primaryText="Utah" />
              <MenuItem value="VT" primaryText="Vermont" />
              <MenuItem value="VA" primaryText="Virginia" />
              <MenuItem value="WA" primaryText="Washington" />
              <MenuItem value="WV" primaryText="West Virginia" />
              <MenuItem value="WI" primaryText="Wisconsin" />
              <MenuItem value="WY" primaryText="Wyoming" />
            </IconMenu>

            <IconMenu
              iconButtonElement={mapsButtonElement}
              maxHeight={272}
              openDirection="top-right"
              valueLink={usStateValueLink}>
              <MenuItem value="AL" primaryText="Alabama" />
              <MenuItem value="AK" primaryText="Alaska" />
              <MenuItem value="AZ" primaryText="Arizona" />
              <MenuItem value="AR" primaryText="Arkansas" />
              <MenuItem value="CA" primaryText="California" />
              <MenuItem value="CO" primaryText="Colorado" />
              <MenuItem value="CT" primaryText="Connecticut" />
              <MenuItem value="DE" primaryText="Delaware" />
              <MenuItem value="DC" primaryText="District Of Columbia" />
              <MenuItem value="FL" primaryText="Florida" />
              <MenuItem value="GA" primaryText="Georgia" />
              <MenuItem value="HI" primaryText="Hawaii" />
              <MenuItem value="ID" primaryText="Idaho" />
              <MenuItem value="IL" primaryText="Illinois" />
              <MenuItem value="IN" primaryText="Indiana" />
              <MenuItem value="IA" primaryText="Iowa" />
              <MenuItem value="KS" primaryText="Kansas" />
              <MenuItem value="KY" primaryText="Kentucky" />
              <MenuItem value="LA" primaryText="Louisiana" />
              <MenuItem value="ME" primaryText="Maine" />
              <MenuItem value="MD" primaryText="Maryland" />
              <MenuItem value="MA" primaryText="Massachusetts" />
              <MenuItem value="MI" primaryText="Michigan" />
              <MenuItem value="MN" primaryText="Minnesota" />
              <MenuItem value="MS" primaryText="Mississippi" />
              <MenuItem value="MO" primaryText="Missouri" />
              <MenuItem value="MT" primaryText="Montana" />
              <MenuItem value="NE" primaryText="Nebraska" />
              <MenuItem value="NV" primaryText="Nevada" />
              <MenuItem value="NH" primaryText="New Hampshire" />
              <MenuItem value="NJ" primaryText="New Jersey" />
              <MenuItem value="NM" primaryText="New Mexico" />
              <MenuItem value="NY" primaryText="New York" />
              <MenuItem value="NC" primaryText="North Carolina" />
              <MenuItem value="ND" primaryText="North Dakota" />
              <MenuItem value="OH" primaryText="Ohio" />
              <MenuItem value="OK" primaryText="Oklahoma" />
              <MenuItem value="OR" primaryText="Oregon" />
              <MenuItem value="PA" primaryText="Pennsylvania" />
              <MenuItem value="RI" primaryText="Rhode Island" />
              <MenuItem value="SC" primaryText="South Carolina" />
              <MenuItem value="SD" primaryText="South Dakota" />
              <MenuItem value="TN" primaryText="Tennessee" />
              <MenuItem value="TX" primaryText="Texas" />
              <MenuItem value="UT" primaryText="Utah" />
              <MenuItem value="VT" primaryText="Vermont" />
              <MenuItem value="VA" primaryText="Virginia" />
              <MenuItem value="WA" primaryText="Washington" />
              <MenuItem value="WV" primaryText="West Virginia" />
              <MenuItem value="WI" primaryText="Wisconsin" />
              <MenuItem value="WY" primaryText="Wyoming" />
            </IconMenu>

            <IconMenu
              iconButtonElement={mapsButtonElement}
              maxHeight={272}
              openDirection="top-left"
              valueLink={usStateValueLink}>
              <MenuItem value="AL" primaryText="Alabama" />
              <MenuItem value="AK" primaryText="Alaska" />
              <MenuItem value="AZ" primaryText="Arizona" />
              <MenuItem value="AR" primaryText="Arkansas" />
              <MenuItem value="CA" primaryText="California" />
              <MenuItem value="CO" primaryText="Colorado" />
              <MenuItem value="CT" primaryText="Connecticut" />
              <MenuItem value="DE" primaryText="Delaware" />
              <MenuItem value="DC" primaryText="District Of Columbia" />
              <MenuItem value="FL" primaryText="Florida" />
              <MenuItem value="GA" primaryText="Georgia" />
              <MenuItem value="HI" primaryText="Hawaii" />
              <MenuItem value="ID" primaryText="Idaho" />
              <MenuItem value="IL" primaryText="Illinois" />
              <MenuItem value="IN" primaryText="Indiana" />
              <MenuItem value="IA" primaryText="Iowa" />
              <MenuItem value="KS" primaryText="Kansas" />
              <MenuItem value="KY" primaryText="Kentucky" />
              <MenuItem value="LA" primaryText="Louisiana" />
              <MenuItem value="ME" primaryText="Maine" />
              <MenuItem value="MD" primaryText="Maryland" />
              <MenuItem value="MA" primaryText="Massachusetts" />
              <MenuItem value="MI" primaryText="Michigan" />
              <MenuItem value="MN" primaryText="Minnesota" />
              <MenuItem value="MS" primaryText="Mississippi" />
              <MenuItem value="MO" primaryText="Missouri" />
              <MenuItem value="MT" primaryText="Montana" />
              <MenuItem value="NE" primaryText="Nebraska" />
              <MenuItem value="NV" primaryText="Nevada" />
              <MenuItem value="NH" primaryText="New Hampshire" />
              <MenuItem value="NJ" primaryText="New Jersey" />
              <MenuItem value="NM" primaryText="New Mexico" />
              <MenuItem value="NY" primaryText="New York" />
              <MenuItem value="NC" primaryText="North Carolina" />
              <MenuItem value="ND" primaryText="North Dakota" />
              <MenuItem value="OH" primaryText="Ohio" />
              <MenuItem value="OK" primaryText="Oklahoma" />
              <MenuItem value="OR" primaryText="Oregon" />
              <MenuItem value="PA" primaryText="Pennsylvania" />
              <MenuItem value="RI" primaryText="Rhode Island" />
              <MenuItem value="SC" primaryText="South Carolina" />
              <MenuItem value="SD" primaryText="South Dakota" />
              <MenuItem value="TN" primaryText="Tennessee" />
              <MenuItem value="TX" primaryText="Texas" />
              <MenuItem value="UT" primaryText="Utah" />
              <MenuItem value="VT" primaryText="Vermont" />
              <MenuItem value="VA" primaryText="Virginia" />
              <MenuItem value="WA" primaryText="Washington" />
              <MenuItem value="WV" primaryText="West Virginia" />
              <MenuItem value="WI" primaryText="Wisconsin" />
              <MenuItem value="WY" primaryText="Wyoming" />
            </IconMenu>
          </div>
        </CodeExample>
      </ComponentDoc>
    );

  }

  _handleIconMenuChange(e, value) {
    this.setState({
      iconMenuValue: value,
    });
  }

  _handleIconMenuMultiChange(e, value) {
    this.setState({
      iconMenuMultiValue: value,
    });
  }

  _handleIconMenuUsStateChange(e, value) {
    this.setState({
      usState: value,
    });
  }

  _handleIconMenuValueLinkChange(e, value) {
    this.setState({
      iconMenuValueLink: value,
    });
  }

}
