var React = require('react');
var mui = require('mui');
var CodeBlock = require('../../code-example/code-block.jsx');
var ComponentDoc = require('../../component-doc.jsx');
var ComponentInfo = require('../../component-info.jsx');

var {
  Checkbox,
  DatePicker, 
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  LeftNav, 
  MenuItem,
  Paper, 
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar, 
  Slider,
  Tabs, 
  Tab,
  TextField,
  Toggle} = mui;

var ThemeManager = new mui.Styles.ThemeManager();

class ThemesPage extends React.Component {

  constructor() {
    this.onTabChange = this.onTabChange.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickSnackbar = this.handleClickSnackbar.bind(this);
    this.handleTouchTapDialog = this.handleTouchTapDialog.bind(this);
    this.handleAction = this.handleAction.bind(this);

    this.state = {
      isThemeDark: false
    };
  }

  getChildContext() {
    return {
      theme: ThemeManager.getCurrentTheme()
    }
  }

	render() {

    var usageCode = 
          'var React = require(\'react\');\n' +
          'var mui = require(\'mui\');\n' +
          'var ThemeManager = new mui.Styles.ThemeManager();\n\n' +
          'class OuterMostParentComponent extends React.Component {\n' +
          '  // Important!\n' +
          '  getChildContext() { \n' +
          '    return {\n' +
          '      theme: ThemeManager.getCurrentTheme()\n' +
          '    }\n' +
          '  }\n' +
          '};\n\n' +
          '// Important!\n' +
          'OuterMostParentComponent.childContextTypes = {\n' +
          '  theme: React.PropTypes.object\n' +
          '};\n\n' +
          'module.exports = OuterMostParentComponent;';

    var customComponentCode = 
          'CustomReactComponent.contextTypes = {\n' +
          '  theme: React.PropTypes.object\n' +
          '}';

    var desc = 'ThemeManager allows you to manipulate the current theme of your website. Themes are ' +
               'Javascript objects made up of two getter functions: getPalette() and ' +
               'getComponentThemes(palette). ThemeManager is composed of two objects: palette and ' +
               'component. Each contain a collection of variables used by Material-UI components. ' +
               'Themes give you further customization across your entire website or for specific ' +
               'pages.';
        
    var info = [
      {
        name: 'ThemeManager Props',
        infoArray: [
          {
            name: 'palette',
            type: 'object',
            desc: 'The palette object is a set of color variables used by all ' +
                  'Material-UI components. It should not be modified directly.'          
          },
          {
            name: 'component',
            type: 'object',
            desc: 'The component object is a collection of nested objects for ' +
                  'each Material-UI component that use theme variables. Inside ' +
                  'each nested object is a set of variables utilized only by ' +
                  'a specific component. It should not be modified directly.'    
          },
          {
            name: 'types',
            type: 'object',
            desc: 'Contains the following predefined themes:\n' +
                  '  - LIGHT (Default)\n' +
                  '  - DARK'
          }
        ]
      },
      {
        name: 'ThemeManager Methods',
        infoArray: [
          {
            name: 'getCurrentTheme',
            header: 'ThemeManager.getCurrentTheme()',
            desc: 'Returns the current theme being used by the context.'           
          },
          {
            name: 'setTheme',
            header: 'ThemeManager.setTheme(newTheme)',
            desc: 'Sets the properties of the current theme with those defined ' +
                  'from the overrides object argument. Overriding properties of ' +
                  'ThemeManager.palette (your primary and accent colors) will signal ' + 
                  'all component to update their theme variables in order to ' +
                  'use the new changes. Thus, overrides to component properties ' +
                  'made before '
          },
          {
            name: 'setPalette',
            header: 'ThemeManager.setPalette(newPalette)',
            desc: 'Updates the palette object of the current theme to use the ' +
                  'properties defined in newPalette. Calling this method also ' +
                  'calls the getCurrentThemes function of the currentTheme, ' +
                  'which updates their values to use the new palette.'
          },
          {
            name: 'setComponentThemes',
            header: 'ThemeManager.setComponentThemes(overrides)',
            desc: 'Updates the component object of the current theme to use the ' +
                  'properties defined in overrides.'            
          },
        ]
      }
    ];

    var code = 
      '// Toggles between light and dark themes\n' +
      '// This function is passed as the \'onChange\' prop for Tabs\n' +
      'onTabChange(tabIndex, tab) {\n' +
      '  if (this.state.isThemeDark) {\n' +
      '    ThemeManager.setTheme(ThemeManager.types.LIGHT);\n' +
      '  } else {\n' +
      '    ThemeManager.setTheme(ThemeManager.types.DARK);\n' +
      '  }\n' +
      '  this.setState({isThemeDark: !this.state.isThemeDark});\n' +
      '}';

		return (
			<div>

        <ComponentDoc
          name="Themes"
          code={code}
          desc={desc}
          componentInfo={info}>
            {this.getThemeExamples()}
        </ComponentDoc>


        <h3 className="mui-font-style-title">Usage</h3>
        <p>
          Material-UI&#39;s <a href="https://github.com/callemall/material-ui/blob/master/src/styles/theme-manager.js">
          ThemeManager component</a> uses React&#39;s <a href="https://facebook.github.io/react/blog/2014/03/28/the-road-to-1.0.html#context">
          context</a> feature to manage Theme objects. Contexts in React propogates values down from one 
          component down to all of its children and grandchildren. Insert the following code in your 
          outermost component, so that all Material-UI components used through-out the site have 
          access to the theme.
        </p>
        <Paper className="code-example">
          <CodeBlock>{usageCode}</CodeBlock>
        </Paper>
        <p>
          <b>Important:</b> The code above is <u>required</u> when using Material-UI. Without it, 
          Material-UI components will not have access to the default theme and will not render as 
          a result. Keep in mind that the user is responsible for updating CSS classes to be in 
          sync with theme properties, because Material-UI components only use inline-styles.
        </p>


        <h3 className="mui-font-style-title">Custom Themes</h3>
        <p>
          To see an example containing all theme variables, checkout our <a href="https://github.com/callemall/material-ui/blob/master/src/styles/themes/light-theme.js">
          light-theme</a>. The code-block below defines the structure needed to have a valid custom 
          theme. Note that if a property is not defined in the custom theme, the default will be 
          what is defined in our light theme.
        </p>
        <Paper>
          <CodeBlock>{this.getThemeStructure()}</CodeBlock>
        </Paper>


        <h3 className="mui-font-style-title">Overriding Theme Variables</h3>

        <p>
          If you would like to make changes to the Theme for a specific pages, include the code 
          below in said page. All components defined on this page along with there children will 
          use your Theme overrides. The toggle buttons in the <a href="#/components/menus">Menus 
          page</a> is an example of this.
        </p>
        <Paper>
          <CodeBlock>{this.getOverrideExamplePage()}</CodeBlock>
        </Paper>




        <h3 className="mui-font-style-title">Giving Custom React Components Access to Theme</h3>
        <p>
          If you would only like to create a React component with access to Theme, include the code 
          below at the end of your component&#39;s class definition. This is valid because the usage 
          code mentioned earlier had been inserted in the outer most component. <a href='https://github.com/callemall/material-ui/blob/master/docs/src/app/components/code-example/code-example.jsx'>
          CodeExample</a> is an example of a custom component using ThemeManager. 
        </p>
        <Paper>
          <CodeBlock>{customComponentCode}</CodeBlock>
        </Paper>

      </div>
		);
	}

  getThemeStructure() {
    var text =
      'var CustomTheme = {\n' +
      '  getPalette: function() {\n' +
      '    return {\n' +
      '      primary1Color: String,\n' +
      '      primary2Color: String,\n' +
      '      primary3Color: String,\n' +
      '      accent1Color: String,\n' +
      '      accent2Color: String,\n' +
      '      accent3Color: String,\n' +
      '      textColor: String,\n' +
      '      canvasColor: String,\n' +
      '      borderColor: String,\n' +
      '      disabledColor: String\n' +
      '    };\n' +
      '  },\n' +
      '  getComponentThemes: function(palette) {\n' +
      '    return {\n' +
      '      appBar: {\n' +
      '        color: String,\n' +
      '        textColor: String,\n' +
      '        height: Number\n' +
      '      },\n' +
      '      button: {\n' +
      '        height: Number,\n' +
      '        minWidth: Number,\n' +
      '        iconButtonSize: Number\n' +
      '      },\n' +
      '      checkbox: {\n' +
      '        boxColor: String,\n' +
      '        checkedColor: String,\n' +
      '        requiredColor: String,\n' +
      '        disabledColor: String\n' +
      '      },\n' +
      '      datePicker: {\n' +
      '        color: String,\n' +
      '        textColor: String,\n' +
      '        calendarTextColor: String,\n' +
      '        selectColor: String,\n' +
      '        selectTextColor: String,\n' +
      '      },\n' +
      '      dropDownMenu: {\n' +
      '        accentColor: String,\n' +
      '      },\n' +
      '      flatButton: {\n' +
      '        color: String,\n' +
      '        textColor: String,\n' +
      '        primaryTextColor: String,\n' +
      '        secondaryTextColor: String,\n' +
      '        disabledColor: String\n' +
      '      },\n' +
      '      floatingActionButton: {\n' +
      '        buttonSize: Number,\n' +
      '        miniSize: Number,\n' +
      '        color: String,\n' +
      '        iconColor: String,\n' +
      '        secondaryColor: String,\n' +
      '        secondaryIconColor: String,\n' +
      '        disabledColor: String,\n' +
      '        disabledTextColor: String\n' +
      '      },\n' +
      '      leftNav: {\n' +
      '        width: Spacing.desktopKeylineIncrement * Number,\n' +
      '        color: String,\n' +
      '      },\n' +
      '      menu: {\n' +
      '        backgroundColor: String,\n' +
      '        containerBackgroundColor: String,\n' +
      '      },\n' +
      '      menuItem: {\n' +
      '        dataHeight: Number,\n' +
      '        height: Number,\n' +
      '        hoverColor: String,\n' +
      '        padding: Spacing.Number,\n' +
      '        selectedTextColor: String,\n' +
      '      },\n' +
      '      menuSubheader: {\n' +
      '        padding: Spacing.Number,\n' +
      '        borderColor: String,\n' +
      '        textColor: String,\n' +
      '      },\n' +
      '      paper: {\n' +
      '        backgroundColor: String,\n' +
      '      },\n' +
      '      radioButton: {\n' +
      '        borderColor: String,\n' +
      '        backgroundColor: String,\n' +
      '        checkedColor: String,\n' +
      '        requiredColor: String,\n' +
      '        disabledColor: String,\n' +
      '        size: Number,\n' +
      '      },\n' +
      '      raisedButton: {\n' +
      '        color: String,\n' +
      '        textColor: String,\n' +
      '        primaryColor: String,\n' +
      '        primaryTextColor: String,\n' +
      '        secondaryColor: String,\n' +
      '        secondaryTextColor: String,\n' +
      '        disabledColor: String,\n' +
      '        disabledTextColor: String\n'
      '      },\n' +
      '      slider: {\n' +
      '        trackSize: Number,\n' +
      '        trackColor: String,\n' +
      '        trackColorSelected: String,\n' +
      '        handleSize: Number,\n' +
      '        handleSizeActive: Number,\n' +
      '        handleSizeDisabled: Number,\n' +
      '        handleColorZero: String,\n' +
      '        handleFillColor: String,\n' +
      '        selectionColor: String,\n' +
      '        rippleColor: String,\n' +
      '      },\n' +
      '      snackbar: {\n' +
      '        textColor: String,\n' +
      '        backgroundColor: String,\n' +
      '        actionColor: String,\n' +
      '      },\n' +
      '      toggle: {\n' +
      '        thumbOnColor: String,\n' +
      '        thumbOffColor: String,\n' +
      '        thumbDisabledColor: String,\n' +
      '        thumbRequiredColor: String,\n' +
      '        trackOnColor: String,\n' +
      '        trackOffColor: String,\n' +
      '        trackDisabledColor: String,\n' +
      '        trackRequiredColor: String\n' +
      '      },\n' +
      '      toolbar: {\n' +
      '        backgroundColor: String,\n' +
      '        height: Number,\n' +
      '        titleFontSize: Number,\n' +
      '        iconColor: String,\n' +
      '        separatorColor: String,\n' +
      '        menuHoverColor: String,\n' +
      '        menuHoverColor: String,\n' +
      '      }\n' +
      '    };\n' +
      '  }\n' +
      '}\n\n' +
      'module.exports = CustomTheme;';
      return text;
  }

  getComponentGroup() {
    //Standard Actions
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    var menuItemsNav = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'component', text: 'Component' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      { 
         type: MenuItem.Types.LINK, 
         payload: 'https://github.com/callemall/material-ui', 
         text: 'GitHub' 
      },
      { 
         text: 'Disabled', 
         disabled: true 
      },
      { 
         type: MenuItem.Types.LINK, 
         payload: 'https://www.google.com', 
         text: 'Disabled Link', 
         disabled: true 
      },
    ];

    var paperStyles = {
      height: 100,
      width: 100,
      margin: '0 auto',
      marginBottom: 64,
    };

    var textfieldStyles = {
      width: '100%',
    };

    var sliderStyles = {
      marginTop: 0,
      marginBottom: 0
    }

    var menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];

    return (
      <div className="component-examples">

          <div className="component-examples-group-centered">
            <div className="component-examples-container">
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true}/>
            </div>
            <div className="component-examples-container">
              <RaisedButton label="Secondary" secondary={true} />
            </div>
            <div className="component-examples-container">
              <RaisedButton label="Primary"  primary={true}/>
            </div>
            <div className="component-examples-container">
              <RaisedButton label="Default"/>
            </div>
          </div>

          <div className="component-examples-group">
            <div className="component-examples-container">
              <Checkbox
                name="checkboxName1"
                value="checkboxValue1"
                label="checkbox" />
              <Checkbox
                name="checkboxName2"
                value="checkboxValue2"
                label="disabled checkbox"
                disabled={true} />
            </div>
            <div className="component-examples-container">
              <RadioButtonGroup 
                name="shipSpeed"
                defaultSelected="usd">
                  <RadioButton
                    value="usd"
                    label="USD" />
                  <RadioButton
                    value="euro"
                    label="Euro"
                    defaultChecked={true} />
                 <RadioButton
                    value="mxn"
                    label="MXN"
                    disabled={true}/>
              </RadioButtonGroup>
            </div>
            <div className="component-examples-container">
              <Toggle
                name="toggleName1"
                value="toggleValue1"
                label="toggle" />
              <Toggle
                name="toggleName2"
                value="toggleValue2"
                label="disabled toggle"
                defaultToggled={true}
                disabled={true} />
            </div>
          </div>

          <div className="component-examples-group" style={{marginTop: 0}}>
            <div className="component-examples-container">
              <TextField
                style={textfieldStyles}
                hintText="TextField"/>
            </div>
            <div className="component-examples-container">
              <DatePicker
                hintText="Landscape Dialog"
                mode="landscape"/>
            </div>
            <div className="component-examples-container">
              <DropDownMenu menuItems={menuItems} />
           </div>
          </div>

          <div className="component-examples-group-slider">
            <Slider style={sliderStyles} name="slider2" defaultValue={0.5} />
          </div>

          <div className="component-examples-group-centered">
            <div className="component-examples-container">
              <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
              <Dialog ref="dialog" title="Dialog With Standard Actions" actions={standardActions}>
                The actions in this window are created from the json that&#39;s passed in. 
              </Dialog>
            </div>
          </div>

          <div className="component-examples-group-centered">
            <div className="component-examples-container">
              <FlatButton
                  onTouchTap={this.handleClickNav}
                  label="View LeftNav" />
              <LeftNav ref="leftNav" docked={false} menuItems={menuItemsNav} />
            </div>
          </div>
          
          <div className="component-examples-group-centered">
            <div className="component-examples-container">
              <FlatButton
                onTouchTap={this.handleClickSnackbar}
                label="View Snackbar" />
              <Snackbar
                ref="snackbar"
                message="This is a snackbar"
                action="Got It!"
                onActionTouchTap={this.handleAction}/>
            </div>            
          </div>
      </div>
    );
  }

  getThemeExamples() {
    return (
      <Tabs onChange={this.onTabChange}>
        <Tab label='Light Theme (Default)'>
          {this.getComponentGroup()}
        </Tab>
        <Tab label='Dark Theme'>
          {this.getComponentGroup()}
        </Tab>
      </Tabs>
    );
  }

  getOverrideExampleComponent() {

    var theme1 = ThemeManager.getCurrentTheme();



    return (
      <div className="component-examples">
        <div className="component-examples-group">
          <div className="component-examples-container">
            <RaisedButton label="Override 1"/>
          </div>
        </div>
        <div className="component-examples-group">
          <div className="component-examples-container">
            <RaisedButton label="Override 2"/>
          </div>
        </div>
        <div className="component-examples-group">
          <div className="component-examples-container">
            <RaisedButton label="Override 3"/>
          </div>
        </div>
      </div>
    );
  }

  getOverrideExamplePage() {
    return (
      'class MenusPage extends React.Component {\n' +
      '  componentWillMount() {\n' +
      '    //this.context is valid because the context was defined in the \n' +
      '    //main page which is MenuPage\'s grandparent.\n' +
      '    this.context.theme.setComponentThemes({\n' +
      '      toggle: {\n' +
      '        thumbOnColor: String,\n' +
      '        trackOnColor: String,\n' +
      '      }\n' +
      '    });\n' +
      '  }\n' +
      '}\n\n' +
      'MenusPage.contextTypes = {\n' +
      '  theme: React.PropTypes.object\n' +
      '};'
    );
  }


  // Toggles between light and dark themes
  onTabChange(tabIndex, tab) {
    if (this.state.isThemeDark) {
      ThemeManager.setTheme(ThemeManager.types.LIGHT);
    } else {
      ThemeManager.setTheme(ThemeManager.types.DARK);
    }
    this.setState({isThemeDark: !this.state.isThemeDark});
  }

  handleAction(e) {
    this.refs.snackbar.dismiss();
  }

  handleClickNav(e) {
    this.refs.leftNav.toggle();
  }

  handleClickSnackbar(e) {
    this.refs.snackbar.show();
  }

  handleTouchTapDialog(e) {
    this.refs.dialog.show();
  }
}

ThemesPage.childContextTypes = {
  theme: React.PropTypes.object
};

module.exports = ThemesPage;