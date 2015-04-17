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

var Theme = new mui.Styles.Theme();

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
      theme: Theme.getCurrentTheme()
    }
  }

	render() {

    var usageCode = 
          'var React = require(\'react\');\n' +
          'var mui = require(\'mui\');\n' +
          'var Theme = mui.Styles.Theme;\n' +
          'class RootComponent extends React.Component {\n' +
          '...\n' +
          '  getChildContext() {\n' +
          '    return {\n' +
          '      theme: Theme.getCurrentTheme()\n' +
          '    }\n' +
          '  }\n' +
          '...\n' +
          '};\n\n' +
          'Master.childContextTypes = {\n' +
          '  theme: React.PropTypes.object\n' +
          '};\n\n' +
          'module.exports = RootComponent;';

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

    var customComponentCode = 
          'CustomReactComponent.contextTypes = {\n' +
          '  theme: React.PropTypes.object\n' +
          '}';

    var desc = 'Themes give you further customization by allowing you to apply ' +
               'changes across your entire website or for specific instances.';
        
    var info = [
      {
        name: 'Theme',
        infoArray: [
          {
            name: 'getCurrentTheme',
            header: 'Theme.getCurrentTheme()',
            desc: 'Returns the current theme being used by the context.'           
          },
          {
            name: 'setTheme',
            header: 'Theme.setTheme(newTheme)',
            desc: 'Sets the properties of the current theme with those defined ' +
                  'from the overrides object argument. Overriding properties of ' +
                  'Theme.palette (your primary and accent colors) will signal ' + 
                  'all component to update their theme variables in order to ' +
                  'use the new changes. Thus, overrides to component properties ' +
                  'made before '
          },
          {
            name: 'setPalette',
            header: 'Theme.setPalette(newPalette)',
            desc: 'Updates the palette object of the current theme to use the ' +
                  'properties defined in newPalette. The theme\'s component ' +
                  'object is also updated to used the new palette, so it is ' +
                  'important to call setPalette() before setComponentThemes().' +
                  'setTheme() basically does handles this for you'  
          },
          {
            name: 'setComponentThemes',
            header: 'Theme.setComponentThemes(overrides)',
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
      '    Theme.setTheme(Theme.types.LIGHT);\n' +
      '  } else {\n' +
      '    Theme.setTheme(Theme.types.DARK);\n' +
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
          Material-UI&#39;s <a href="https://github.com/callemall/material-ui/blob/master/src/styles/theme.js">
          Theme component</a> uses React&#39;s <a href="https://facebook.github.io/react/blog/2014/03/28/the-road-to-1.0.html#context">
          context</a> feature. Contexts in React pass values down from one component down to all of 
          its grandchildren. Insert the following code in your outermost component, so that all 
          Material-UI components used through-out the site can get access to the theme.
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
          If you would only like override specific theme variables rather than pass a custom theme, 
          use <code>setPalette()</code> or <code>setComponentThemes()</code> where appropriate.
        </p>

        <Paper>
          <CodeBlock>{this.getOverrideExample()}</CodeBlock>
        </Paper>



        <h3 className="mui-font-style-title">Giving Custom React Components Access to Theme</h3>
        <p>
          If you would only like to create a React component with access to Theme, include the code 
          below at the end of your component&#39;s class definition. This is valid because the usage 
          code mentioned earlier had been inserted in the outer most component. <a href='https://github.com/callemall/material-ui/blob/master/docs/src/app/components/code-example/code-example.jsx'>
          CodeExample</a> is an example of a custom component using Theme. 
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
      '      // Define palette property overrides here. For example:\n' +
      '      canvasColor: \'#303030\',\n' +
      '    };\n' +
      '  },\n' +
      '  getComponentThemes: function() {\n' +
      '    return {\n' +
      '      // Define component property overrides. For example:\n' +
      '      floatingActionButton: {\n' +
      '        disabledColor: ColorManipulator.fade(this.palette.textColor, 0.12)\n' +
      '      },\n' +
      '      slider: {\n' +
      '        trackColor: Colors.minBlack,\n' +
      '        handleColorZero: cardColor,\n' +
      '        handleFillColor: cardColor,\n' +
      '        selectionColor: Colors.cyan200,\n' +
      '      }\n' +
      '    };\n' +
      '  }\n' +
      '}\n\n' +
      '// Initializing our component object\n' +
      'CustomTheme.component = CustomTheme.getComponentThemes();';
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

  getOverrideExample() {

    var theme1 = Theme.getCurrentTheme();



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


  // Toggles between light and dark themes
  onTabChange(tabIndex, tab) {
    if (this.state.isThemeDark) {
      Theme.setTheme(Theme.types.LIGHT);
    } else {
      Theme.setTheme(Theme.types.DARK);
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