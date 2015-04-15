var React = require('react');
var mui = require('mui');
var CodeBlock = require('../../code-example/code-block.jsx');
var ComponentDoc = require('../../component-doc.jsx');

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

var Theme = mui.Styles.Theme;

class ThemesPage extends React.Component {

  constructor() {
    this.onTabChange = this.onTabChange.bind(this);

    this.state = {
      isThemeDark: false
    };
  }

  getChildContext() {
    return {
      theme: Theme.getCurrentTheme()
    }
  }

	render() {

    var usageCodeReact12 = 
          'var React = require(\'react\');\n' +
          'var mui = require(\'mui\');\n' +
          'var Theme = mui.Styles.Theme;\n' +
          'var MainPage = React.createClass ({\n' +
          '...\n' +
          '  childContextTypes: {\n' +
          '    theme: React.PropTypes.object\n' +
          '  };\n\n' +
          '  getChildContext: function() {\n' +
          '    return {\n' +
          '      theme: Theme.get()\n' +
          '    }\n' +
          '  }\n' +
          '...\n' +
          '};\n\n' +
          'module.exports = MainPage;';

    var usageCodeReact13 = 
          'var React = require(\'react\');\n' +
          'var mui = require(\'mui\');\n' +
          'var Theme = mui.Styles.Theme;\n' +
          'class MainPage extends React.Component {\n' +
          '...\n' +
          '  getChildContext() {\n' +
          '    return {\n' +
          '      theme: Theme.get()\n' +
          '    }\n' +
          '  }\n' +
          '...\n' +
          '};\n\n' +
          'Master.childContextTypes = {\n' +
          '  theme: React.PropTypes.object\n' +
          '};\n\n' +
          'module.exports = MainPage;';

    var overridingThemeCode = 
          '  // \'Use getChildContext: function()\' for React v0.12 '
          '  getChildContext() {\n' +
          '    Theme.set({\n'+
          '      floatingActionButton: {\n' +
          '        secondaryColor: \'rgb(255, 0, 255)\',\n' +
          '        secondaryIconColor: \'rgba(255, 0, 255, 0.5)\'\n' +
          '      },\n' +
          '      radioButton: {\n' +
          '        checkedColor: \'rgb(255, 255, 0)\'\n' +
          '      },\n' +
          '    });\n' + 
          '    return {\n' +
          '      theme: Theme.get()\n' +
          '    }\n' +
          '  }';

    var componentInfo = [
      {
        name: 'Theme',
        infoArray: [
          {
            name: 'set',
            header: 'Theme.set(overrides)',
            desc: 'Sets the properties of the current theme with those defined ' +
                  'from the overrides object argument. Overriding properties of ' +
                  'Theme.palette (your primary and accent colors) will signal ' + 
                  'all component to update their theme variables in order to ' +
                  'use the new changes. Thus, overrides to component properties ' +
                  'made before '
          },
          {

          },
        ]
      }
    ];

		return (
			<div className="app-content-canvas">
        <h2 className="mui-font-style-headline">Themes</h2>
        <p>
          Themes give you further customization by allowing you to apply changes across 
          your entire website or for specific instances. Here is an example:
        </p>

        <Paper className="code-example">
          {this.getComponentExamples()}
        </Paper>

        <h3 className="mui-font-style-title">Structure</h3>
        <p>
          Theme objects are composed of nested objects for each component along 
          with a palette object containing colors used by all component:
        </p>

        <Paper>
          <CodeBlock>{this.getThemeStructure()}</CodeBlock>
        </Paper>

        <h3 className="mui-font-style-title">Usage</h3>
        <p>
          Material-UI&#39;s <a href="https://github.com/callemall/material-ui/blob/master/src/styles/theme.js">
          Theme component</a> uses React&#39;s <a href="https://facebook.github.io/react/blog/2014/03/28/the-road-to-1.0.html#context">
          context</a> feature. Contexts in React are a way to pass values down from one component down to all 
          of its grandchildren. Let&#39;s pass down our theme from our main page, so that all mui component 
          used through-out the site can get access.
        </p>

        <Tabs>
            <Tab label='React v0.13'>
              <Paper className="code-example">
                <CodeBlock>{usageCodeReact13}</CodeBlock>
              </Paper>
            </Tab>
            <Tab label='React v0.12'>
              <Paper className="code-example">
                <CodeBlock>{usageCodeReact12}</CodeBlock>
              </Paper>
            </Tab>
        </Tabs>

        <p>
          <b>Important:</b> The code above is required when using mui component. Without it, mui component will not 
          have access to the default theme and will not render as a result.
        </p>


        <h3 className="mui-font-style-title">Overriding Theme Variables</h3>
        <p>
          If we want to modify parts of our default theme. Simply use <b>Theme.set</b>
        </p>
      </div>
		);
	}

  getThemeStructure() {
    var text =
      'palette: {\n' +
      '  primary1Color,\n' +
      '  primary2Color,\n' +
      '  primary3Color,\n' +
      '  accent1Color,\n' +
      '  accent2Color,\n' +
      '  accent3Color,\n' +
      '  textColor,\n' +
      '  canvasColor,\n' +
      '  borderColor,\n' +
      '  disabledColor\n' +
      '},\n' +
      'fontFamily,  \n' +
      'appBar: {\n' +
      '  color,\n' +
      '  textColor,\n' +
      '  height,\n' +
      '},\n' +
      'button: {\n' +
      '  height,\n' +
      '  minWidth,\n' +
      '  iconButtonSize,\n' +
      '},\n' +
      'checkbox: {\n' +
      '  boxColor,\n' +
      '  checkedColor,\n' +
      '  requiredColor,\n' +
      '  disabledColor,\n' +
      '};\n' +
      'datePicker: {\n' +
      '  color,\n' +
      '  textColor,\n' +
      '  calendarTextColor,\n' +
      '  selectColor,\n' +
      '  selectTextColor,\n' +
      '},\n' +
      'dropDownMenu: {\n' +
      '  accentColor,\n' +
      '},\n' +
      'flatButton: {\n' +
      '  color,\n' +
      '  textColor,\n' +
      '  primaryTextColor,\n' +
      '  secondaryTextColor,\n' +
      '  disabledTextColor\n' +
      '},\n' +
      'floatingActionButton: {\n' +
      '  buttonSize,\n' +
      '  miniSize,\n' +
      '  color,\n' +
      '  iconColor,\n' +
      '  secondaryColor,\n' +
      '  secondaryIconColor,\n' +
      '  disabledColor,\n' +
      '  disabledTextColor,\n' +
      '},\n' +
      'leftNav: {\n' +
      '  width,\n' +
      '  color,\n' +
      '},\n' +
      'menu: {\n' +
      '  backgroundColor,\n' +
      '  containerBackgroundColor,\n' +
      '},\n' +
      'menuItem: {\n' +
      '  dataHeight,\n' +
      '  height,\n' +
      '  hoverColor,\n' +
      '  padding,\n' +
      '  selectedTextColor,\n' +
      '},\n' +
      'menuSubheader: {\n' +
      '  padding,\n' +
      '  borderColor,\n' +
      '  textColor,\n' +
      '},\n' +
      'paper: {\n' +
      '  backgroundColor,\n'
      '},\n' +
      'radioButton: {\n' +
      '  borderColor,\n' +
      '  backgroundColor\n' +
      '  checkedColor,\n' +
      '  requiredColor,\n' +
      '  disabledColor,\n' +
      '  size,\n' +
      '},\n' +
      'raisedButton: {\n' +
      '  color,\n' +
      '  textColor,\n' +
      '  primaryColor,\n' +
      '  primaryTextColor,\n' +
      '  secondaryColor,\n' +
      '  secondaryTextColor,\n' +
      '  disabledColor,\n' +
      '  disabledTextColor,\n' +
      '},\n' +
      'slider: {\n' +
      '  trackSize,\n' +
      '  trackColor,\n' +
      '  trackColorSelected,\n' +
      '  handleSize,\n' +
      '  handleSizeActive,\n' +
      '  handleSizeDisabled,\n' +
      '  handleColorZero,\n' +
      '  handleFillColor,\n' +
      '  selectionColor,\n' +
      '  rippleColor,\n' +
      '},\n' +
      'snackbar: {\n' +
      '  textColor,\n' +
      '  backgroundColor,\n' +
      '  actionColor\n' +
      '},\n' +
      'toggle: {\n' +
      '  thumbOnColor,\n' +
      '  thumbOffColor,\n' +
      '  thumbDisabledColor,\n' +
      '  thumbRequiredColor,\n' +
      '  trackOnColor,\n' +
      '  trackOffColor,\n' +
      '  trackDisabledColor,\n' +
      '  trackRequiredColor\n' +
      '},\n' +
      'toolbar: {\n' +
      '  backgroundColor,\n' +
      '  height,\n' +
      '  titleFontSize,\n' +
      '  iconColor,\n' +
      '  separatorColor,\n' +
      '  menuHoverColor,\n' +
      '  menuHoverColor,\n' +
      '}\n';
      return text;
  }

  getComponentGroup() {
    //Standard Actions
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    var menuItems = [
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
                    value="jpy"
                    label="JPY"
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
              <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
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

  getComponentExamples() {
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

  // Toggles between light and dark themes
  onTabChange(tabIndex, tab) {
    if (this.state.isThemeDark) {
      Theme.setTheme(Theme.types.LIGHT);
    } else {
      Theme.setTheme(Theme.types.DARK);
    }
    this.setState({isThemeDark: !this.state.isThemeDark});
  }

  handleAction() {
    alert("We removed the event from your calendar.");
  }

  handleClickNav(e) {
    this.refs.leftNav.show();
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