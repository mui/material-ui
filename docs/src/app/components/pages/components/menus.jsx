var React = require('react');
var mui = require('mui');
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentInfo = require('../../component-info.jsx');

var Typography = mui.Styles.Typography;
var {Tab, Tabs} = mui;


var ThemeManager = new mui.Styles.ThemeManager();

var labelMenuItems = [
  { payload: '1', text: 'ID', data: '1234567890', icon: 'home' },
  { payload: '2', text: 'Type', data: 'Announcement', icon: 'home' },
  { payload: '3', text: 'Caller ID', data: '(123) 456-7890', icon: 'home' }
];

var numberMenuItems = [
  { payload: '1', text: 'All', number: '22'},
  { payload: '3', text: 'Uncategorized', number: '6'},
  { payload: '4', text: 'Trash', number: '11' }
];

var iconMenuItems = [
  { payload: '1', text: 'Live Answer', iconClassName: 'muidocs-icon-communication-phone', number: '10' },
  { payload: '2', text: 'Voicemail', iconClassName: 'muidocs-icon-communication-voicemail',  number: '5' },
  { payload: '3', text: 'Starred', iconClassName: 'muidocs-icon-action-stars', number: '3' },
  { payload: '4', text: 'Shared', iconClassName: 'muidocs-icon-action-thumb-up',  number: '12' }
];

var filterMenuItems = [
  { payload: '1', text: 'Text Opt-In', toggle: true},
  { payload: '2', text: 'Text Opt-Out', toggle: true, defaultToggled: true},
  { payload: '3', text: 'Voice Opt-Out', toggle: true, disabled: true}
];

var nestedMenuItems = [
  { type: mui.MenuItem.Types.NESTED, text: 'Reports', items: [
    { payload: '1', text: 'Nested Item 1' },
    { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2', items: [
      { payload: '1', text: 'Nested Item 2.1' },
      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2.2', items: [
        { payload: '1', text: 'Nested Item 2.2.1' },
        { payload: '3', text: 'Nested Item 2.2.2' }
      ] },
      { payload: '3', text: 'Nested Item 2.3' }
    ] },
    { payload: '3', text: 'Nested Item 3' },
    { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4', items: [
      { payload: '1', text: 'Nested Item 4.1' },
      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4.2', items: [
        { payload: '1', text: 'Nested Item 4.2.1', disabled: true },
        { payload: '3', text: 'Nested Item 4.2.2' }
      ] },
      { payload: '3', text: 'Nested Item 4.3' }
    ] },
    { payload: '4', text: 'Nested Item 5' }
  ] },
  { payload: '1', text: 'Audio Library'},
  { payload: '2', text: 'Settings'},
  { payload: '3', text: 'Logout', disabled: true}
];

var componentInfo = [
  {
    name: 'Props',
    infoArray: [
      {
        name: 'autoWidth',
        type: 'boolean',
        header: 'default: true',
        desc: 'If true, the width of the Menu is constant. If false, the ' +
              'width of the Menu is set to 100%.'
      },
      {
        name: 'hideable',
        type: 'boolean',
        header: 'default: false',
        desc: 'Determines whether of not the Menu can be hidden via the ' +
              'visible prop.'
      },
      {
        name: 'menuItems',
        type: 'Array',
        header: 'required',
        desc: 'An array of objects describing the properties of a MenuItem. ' + 
              'If your MenuItem includes a Toggle element and you would like ' +
              'to pass down Toggle properties, include those properties in ' +
              'the same object used to describe the MenuItem.'
      },
      {
        name: 'menuItemClassName',
        type: 'string',
        header: 'optional',
        desc: 'Adds a classname to MenuItems and nested MenuItems for CSS ' +
              'styles.'
      },
      {
        name: 'menuItemClassNameLink',
        type: 'string',
        header: 'optional',
        desc: 'Adds a classname to LinkMenuItems for CSS styles.'
      },
      {
        name: 'menuItemClassNameSubheader',
        type: 'string',
        header: 'optional',
        desc: 'Adds a classname to SubheaderMenuItems for CSS styles.'
      },
      {
        name: 'menuItemStyle',
        type: 'object',
        header: 'optional',
        desc: 'Overrides the inline-styles of MenuItems and nested MenuItems.'
      },
      {
        name: 'menuItemStyleLink',
        type: 'object',
        header: 'optional',
        desc: 'Overrides the inline-styles of LinkMenuItems.'
      },
      {
        name: 'menuItemStyleSubheader',
        type: 'object',
        header: 'optional',
        desc: 'Overrides the inline-styles of SubheaderMenuItems.'
      },
      {
        name: 'selectedIndex',
        type: 'number',
        header: 'optional',
        desc: 'The index of the currently selected MenuItem.'
      },
      {
        name: 'style',
        type: 'object',
        header: 'optional',
        desc: 'Override the inline-styles of Menu\'s root element.'
      },
      {
        name: 'visible',
        type: 'boolean',
        header: 'default: true',
        desc: 'Determines whether of not the Menu is displayed.'
      },
      {
        name: 'zDepth',
        type: 'number',
        header: 'optional',
        desc: 'The zDepth of the Menu. This is equivalent to CSS\'s zDepth ' +
              'property.'
      }
    ]
  },
  {
    name: 'Events',
    infoArray: [
      {
        name: 'onItemTap',
        type: 'function(e, index, menuItem)',
        header: 'optional',
        desc: 'Callback function for when a MenuItem has been selected.'
      },
      {
        name: 'onToggle',
        type: 'function(e, index, toggled)',
        header: 'optional',
        desc: 'Callback function for when a MenuItem with a Toggle component ' +
              'has been toggled.'
      }

    ]
  }
];

class MenusPage extends React.Component {

  componentWillMount() {
    ThemeManager.setComponentThemes({
      toggle: {
        thumbOnColor: 'rgb(255,100,0)',
        trackOnColor: 'rgba(255,100,0,0.5)'
      }
    });
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  getStyles() {
    return {
      exampleMenu: {
        width: '100%'
      },
      exampleMenuNested: {
        width: (64 * 3) + 'px'
      },
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      }
    };
  }

  render() {

    // Copied from component-doc
    var info = componentInfo.map(function(info, i) {
      return (
        <ComponentInfo
          key={i}
          name={info.name}
          infoArray={info.infoArray} />
      );
    });

    return (
      <div>
        <h2 style={this.getStyles().headline}>Menus</h2>
        <Tabs>
          <Tab label="Label Menu">
            {this._getLabelMenuExample()}
          </Tab>
          <Tab label="Number Menu">
            {this._getNumberMenuExample()}
          </Tab>
          <Tab label="Icon Menu">
            {this._getIconMenuExample()}
          </Tab>
          <Tab label="Filter Menu">
            {this._getFilterMenuExample()}
          </Tab>
          <Tab label="Nested Menu">
            {this._getNestedMenuExample()}
          </Tab>
        </Tabs>
        <div className="component-doc-info">
            {info}
        </div>
      </div>
    );
  }

  _getLabelMenuExample() {
    var code =
      "var labelMenuItems = [\n" +
      "   { payload: '1', text: 'ID', data: '1234567890', icon: 'home' },\n" +
      "   { payload: '2', text: 'Type', data: 'Announcement', icon: 'home' },\n" +
      "   { payload: '3', text: 'Caller ID', data: '(123) 456-7890', icon: 'home' }\n" +
      "];\n\n" +
      "//You can also pass an onItemTap callback prop.\n"
      "<Menu menuItems={labelMenuItems} autoWidth={false}/>";

    return (
      <CodeExample code={code}>
        <div style={this.getStyles().exampleMenu}>
          <mui.Menu menuItems={labelMenuItems} onItemTap={this._onItemTap} autoWidth={false}/>
        </div>
      </CodeExample>
    );
  }

  _getNumberMenuExample() {
    var code =
      "var numberMenuItems = [\n" +
      "   { payload: '1', text: 'All', number: '22' },\n" +
      "   { payload: '3', text: 'Uncategorized', number: '6'},\n" +
      "   { payload: '4', text: 'Trash', number: '11' }\n" +
      "];\n\n"  +
      "<Menu menuItems={numberMenuItems} autoWidth={false}/>";

    return (
      <CodeExample code={code}>
        <div style={this.getStyles().exampleMenu}>
          <mui.Menu menuItems={numberMenuItems} onItemTap={this._onItemTap} autoWidth={false}/>
        </div>
      </CodeExample>
    );
  }

  _getIconMenuExample() {
    var code =
      "//iconClassName is the classname for our icon that will get passed into mui.FontIcon\n" +
      "iconMenuItems = [\n" +
      "   { payload: '1', text: 'Live Answer', iconClassName: 'muidocs-icon-communication-phone', number: '10' },\n" +
      "   { payload: '2', text: 'Voicemail', iconClassName: 'muidocs-icon-communication-voicemail',  number: '5' },\n" +
      "   { payload: '3', text: 'Starred', iconClassName: 'muidocs-icon-action-stars', number: '3' },\n" +
      "   { payload: '4', text: 'Shared', iconClassName: 'muidocs-icon-action-thumb-up',  number: '12' }\n" +
      "];\n\n" +
      "<Menu menuItems={iconMenuItems} autoWidth={false}/>";

    return (
      <CodeExample code={code}>
        <div style={this.getStyles().exampleMenu}>
          <mui.Menu menuItems={iconMenuItems} onItemTap={this._onItemTap} autoWidth={false}/>
        </div>
      </CodeExample>
    );
  }

  _getFilterMenuExample() {
    var code =
      "// Include toggle properties as keys so that they are passed into the toggle component\n" +
      "filterMenuItems = [\n" +
      "   { payload: '1', text: 'Text Opt-In', toggle: true},\n" +
      "   { payload: '2', text: 'Text Opt-Out', toggle: true, defaultToggled: true},\n" +
      "   { payload: '3', text: 'Voice Opt-Out', toggle: true, disabled: true}\n" +
      "];\n\n" +
      "<Menu menuItems={filterMenuItems} autoWidth={false}/>";

    return (
      <CodeExample code={code}>
        <div style={this.getStyles().exampleMenu}>
          <mui.Menu menuItems={filterMenuItems} onItemToggle={this._onFilterMenuToggle}  onItemTap={this._onItemTap} autoWidth={false}/>
        </div>
      </CodeExample>
    );
  }

  _getNestedMenuExample() {
    var code =
      "nestedMenuItems = [\n" +
      "    { type: mui.MenuItem.Types.NESTED, text: 'Reports', items: [\n" +
      "      { payload: '1', text: 'Nested Item 1' },\n" +
      "      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2', items: [\n" +
      "        { payload: '1', text: 'Nested Item 2.1' },\n" +
      "        { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 2.2', items: [\n" +
      "          { payload: '1', text: 'Nested Item 2.2.1' },\n" +
      "          { payload: '3', text: 'Nested Item 2.2.2' }\n" +
      "        ] },\n" +
      "        { payload: '3', text: 'Nested Item 2.3' }\n" +
      "      ] },\n" +
      "      { payload: '3', text: 'Nested Item 3' },\n" +
      "      { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4', items: [\n" +
      "        { payload: '1', text: 'Nested Item 4.1' },\n" +
      "        { type: mui.MenuItem.Types.NESTED, text: 'Nested Item 4.2', items: [\n" +
      "          { payload: '1', text: 'Nested Item 4.2.1', disabled: true },\n" +
      "          { payload: '3', text: 'Nested Item 4.2.2' }\n" +
      "        ] },\n" +
      "        { payload: '3', text: 'Nested Item 4.3' }\n" +
      "      ] },\n" +
      "      { payload: '4', text: 'Nested Item 5' }\n" +
      "    ] },\n" +
      "    { payload: '1', text: 'Audio Library'},\n" +
      "    { payload: '2', text: 'Settings'},\n" +
      "    { payload: '3', text: 'Logout', disabled: true}\n" +
      "  ];\n\n" +
      '<Menu menuItems={nestedMenuItems} autoWidth={false}/>';

    return (
      <CodeExample code={code}>
        <div style={this.getStyles().exampleMenuNested}>
          <mui.Menu menuItems={nestedMenuItems} onItemTap={this._onItemTap} autoWidth={false}/>
        </div>
      </CodeExample>
    );
  }

  _onFilterMenuToggle(e, key, menuItem, toggled) {
    console.log('Filter Menu Toggled: ', key, menuItem, toggled)
  }

  _onItemTap(e, key, menuItem) {
    console.log("Menu Item Tap: ", menuItem);
  }

}

MenusPage.contextTypes = {
  muiTheme: React.PropTypes.object
};

MenusPage.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = MenusPage;
