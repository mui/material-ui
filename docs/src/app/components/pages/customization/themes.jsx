const React = require('react');
const mui = require('material-ui');
const CodeBlock = require('../../code-example/code-block');
const ComponentDoc = require('../../component-doc');
const ComponentInfo = require('../../component-info');
const CodeExample = require('../../code-example/code-example');

const {
  Checkbox,
  ClearFix,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  LeftNav,
  MenuItem,
  Mixins,
  Paper,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  Styles,
  Tabs,
  Tab,
  TextField,
  Toggle
} = mui;

const { StylePropable, StyleResizable } = Mixins;
const { Typography } = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;
const DarkRawTheme = Styles.DarkRawTheme;

const ThemesPage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes : {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DarkRawTheme),
      isThemeDark: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    let canvasColor = this.state.muiTheme.rawTheme.palette.canvasColor;
    let borderColor = this.state.muiTheme.rawTheme.palette.borderColor;
    let styles = {
      group: {
        float: 'left',
        width: '100%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box'
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%'
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left'
      },
      containerCentered: {
        textAlign: 'center'
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px'
      },
      textfield: {
        width: '100%'
      },
      slider: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      codeExample: {
        backgroundColor: canvasColor,
        marginBottom: '32px'
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      liveExamplePaper: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden'
      },
      liveExampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: this.state.muiTheme.rawTheme.spacing.desktopGutter,
        margin: 0,
      },
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      },
      pTextWrapper: {
        borderBottom: 'solid 1px ' + borderColor,
        paddingBottom: '10px',
      },
      inlineCode: {
        backgroundColor: '#F8F8F8'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    styles.containerCentered = this.mergeStyles(styles.container, styles.containerCentered);
    styles.groupSlider = this.mergeStyles(styles.group, styles.groupSlider);

    return styles;
  },

  render() {

    let usageCodeES6 =
          'let React = require(\'react\');\n' +
          'let mui = require(\'mui\');\n' +
          'let ThemeManager = new mui.Styles.ThemeManager();\n\n' +
          'class OuterMostParentComponent extends React.Component {\n' +
          '  // Important!\n' +
          '  getChildContext() { \n' +
          '    return {\n' +
          '      muiTheme: ThemeManager.getCurrentTheme()\n' +
          '    };\n' +
          '  }\n' +
          '};\n\n' +
          '// Important!\n' +
          'OuterMostParentComponent.childContextTypes = {\n' +
          '  muiTheme: React.PropTypes.object\n' +
          '};\n\n' +
          'module.exports = OuterMostParentComponent;';

    let usageCodeES5 =
          'let React = require(\'react\');\n' +
          'let mui = require(\'mui\');\n' +
          'let ThemeManager = new mui.Styles.ThemeManager();\n\n' +
          'let OuterMostParentComponent = React.createClass ({\n' +
          '  // Important!\n' +
          '  childContextTypes: {\n' +
          '    muiTheme: React.PropTypes.object\n' +
          '  },\n\n' +
          '  // Important!\n' +
          '  getChildContext() { \n' +
          '    return {\n' +
          '      muiTheme: ThemeManager.getCurrentTheme()\n' +
          '    };\n' +
          '  }\n' +
          '});\n\n' +
          'module.exports = OuterMostParentComponent;';

    let customComponentCode =
          'CustomReactComponent.contextTypes = {\n' +
          '  muiTheme: React.PropTypes.object\n' +
          '}';

    let lightRawTheme = 
      'let Colors = require(\'..\/colors\');\n' +
      'let ColorManipulator = require(\'..\/..\/utils\/color-manipulator\');\n' +
      'let Spacing = require(\'..\/spacing\');\n\n' +
      'module.exports = {\n' +
      '  spacing: Spacing,\n' +
      '  fontFamily: \'Roboto, sans-serif\',\n' +
      '  palette: {\n' +
      '    primary1Color: Colors.cyan500,\n' +
      '    primary2Color: Colors.cyan700,\n' +
      '    primary3Color: Colors.cyan100,\n' +
      '    accent1Color: Colors.pinkA200,\n' +
      '    accent2Color: Colors.pinkA400,\n' +
      '    accent3Color: Colors.pinkA100,\n' +
      '    textColor: Colors.darkBlack,\n' +
      '    canvasColor: Colors.white,\n' +
      '    borderColor: Colors.grey300,\n' +
      '    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),\n' +
      '  },\n' +
      '};\n';

    let reactContextExampleCode =
      'const React = require(\'react\');\n' +
      'const AppBar = require(\'material-ui\/lib\/app-bar\');\n' +
      'const RaisedButton = require(\'material-ui\/lib\/raised-button\');\n\n' +

      'const ThemeManager = require(\'material-ui\/lib\/styles\/theme-manager\');\n' +
      'const MyRawTheme = require(\'path\/to\/your\/raw\/theme\/file\');\n\n' +

      'const MySampleAppComponent = React.createClass({\n\n' +

      '  //the key passed through context must be called \"muiTheme\"\n' +
      '  childContextTypes : {\n' +
      '    muiTheme: React.PropTypes.object,\n' +
      '  },\n\n' + 

      '  getChildContext() {\n' +
      '    return {\n' +
      '      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),\n' +
      '    };\n' +
      '  },\n\n' +

      '  //the app bar and button will receive our theme through\n' +
      '  //context and style accordingly\n' +
      '  render () {\n' +
      '    return (\n' +
      '      <div>\n' +
      '        <AppBar title=\"My AppBar\" \/>\n' +
      '        <RaisedButton label=\"My Button\" primary={true} \/>\n' +
      '      </div>\n' +
      '    );\n' +
      '  },\n' +
      '});\n\n' +
      'module.exports = MySampleAppComponent;\n';

    let decoratorExampleCode =
      'const React = require(\'react\');\n' +
      'const AppBar = require(\'material-ui\/lib\/app-bar\');\n' +
      'const RaisedButton = require(\'material-ui\/lib\/raised-button\');\n\n' +

      'const MyRawTheme = require(\'path\/to\/your\/raw\/theme\/file\');\n' +
      'const ThemeManager = require(\'material-ui\/lib\/styles\/theme-manager\');\n' +
      'const ThemeDecorator = require(\'material-ui\/lib\/styles\/theme-decorator\');\n\n' +

      '@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))\n' +
      'class MySampleAppComponent extends React.Component {\n\n' +

      '  render() {\n' +
      '    return (\n' +
      '      <div>\n' +
      '        <AppBar title=\"My AppBar\" \/>\n' +
      '        <RaisedButton label=\"My Button\" primary={true} onCilck={this.handleClick} \/>\n' +
      '      </div>\n' +
      '    );\n' +
      '  }\n\n' +

      '  //arrow function automatically binds lexical \"this\"\n' +
      '  handleClick = () => {\n' +
      '    //do something in response to button click\n' +
      '  }\n' +
      '}\n\n' +

      'module.exports = MySampleAppComponent;\n';

    let info = [
      {
        name: 'ThemeManager functions',
        infoArray: [
          {
            name: 'getMuiTheme(rawTheme)',
            header: 'returns: calculated muiTheme object',
            desc: 'Accepts one argument which is a reference to a raw theme object, and returns the calculated mui theme object'
          },
          {
            name: 'modifyRawThemeSpacing(muiTheme, newSpacing)',
            header: 'returns: new muiTheme object with modified spacing',
            desc: 'Accepts two arguments: the current mui theme object and the new spacing to be applied. ' +
                  'This function creates a new raw theme by overriding the spacing of the existing raw theme, ' +
                  'and returns a new mui theme object calculated from the new raw theme'
          },
          {
            name: 'modifyRawThemePalette(muiTheme, newPaletteKeys)',
            header: 'returns: new muiTheme object with modified palette',
            desc: 'Accepts two arguments: the current mui theme object and the new palette keys to be applied. ' +
                  'This function creates a new raw theme object by overriding the palette keys in the existing raw ' +
                  'theme object, and returns a new mui theme object calculated from the new raw theme'
          },
          {
            name: 'modifyRawThemeFontFamily(muiTheme, newFontFamily)',
            header: 'returns: new muiTheme object with modified font Family',
            desc: 'Accepts two arguments: the current mui theme object and the new font family to be applied. ' +
                  'This function creates a new raw theme by overriding the font family of the existing raw theme, ' +
                  'and returns a new mui theme object calculated from the new raw theme'
          },
        ]
      }
    ];

    let code =
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

    let styles = this.getStyles();

    return (
      <div>

        <h2 style={styles.headline}>Themes</h2>

        <Paper style={styles.liveExamplePaper}>
          <ClearFix style={styles.liveExampleBlock}>{this.getThemeExamples()}</ClearFix>
        </Paper>

        <div style={styles.pTextWrapper}>
          <p>
            There are two kinds of themes in Material-UI: &quot;raw theme&quot; and &quot;mui theme&quot;.
            The raw theme is a plain JS object containing three keys: spacing, palette and fontFamily.
            The mui theme, on the other hand, is a much bigger object. It contains a key for every material-ui
            component, and the value corresponding to that key describes the styling of that particular component
            under the current raw theme. In this sense, the mui theme is <i>produced</i> from the raw theme.
            The raw theme acts as a basis for styling components, whereas the mui theme contains specific values
            (that are calculated based on the raw theme) for styling each component.
          </p>

          <p>
            We ship two raw themes with Material-UI: light and dark. They are located under <code style={styles.inlineCode}>
            &#47;lib&#47;styles&#47;raw-themes&#47;</code> in the Material-UI root directory. Custom themes may be
            defined similarly. The ThemeManager module calculates the mui theme and acts as an interface to modify the theme.
            Before we discuss how to apply custom themes to an application, let&#39;s look at the functions provided by ThemeManager.
          </p>
        </div>

        <ComponentDoc
          name=""
          componentInfo={info} />


        <h2 style={styles.headline}>Custom Themes</h2>
        <p>
          All Material-UI components use the light theme by default so you can start including them in your project
          without having to worry about theming. However, it is quite straightforward to style components to your liking.
        </p>

        <p>
          Internally, Material-UI components use React&#39;s <a href="https://facebook.github.io/react/blog/2014/03/28/the-road-to-1.0.html#context">
          context</a> feature to implement theming. Context is a way to pass down values through the component
          hierarchy without having to use props at every level. In fact, context is very convenient for concepts like theming,
          which are usually implemented in a hierarchical manner. 
        </p>

        <p>
          There are two recommended ways to apply custom themes: using React lifecycle methods with the context feature, <b>or</b>, 
          using an ES7-style decorator. To start off, define your own raw theme in a JS file like so:
        </p>

        <Paper style={styles.codeExample}>
          <CodeBlock>{lightRawTheme}</CodeBlock>
        </Paper>

        <h3 style={styles.title}>1. Using React Lifecycle Methods with Context</h3>

        <p>
          Once you have defined your raw theme in a JS file, you can use React lifecycle methods
          and the context feature to apply your custom theme as follows:
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{reactContextExampleCode}</CodeBlock>
        </Paper>

        <h3 style={styles.title}>2. Using ES7-style Decorator</h3>
        <p>
          Alternatively, we have provided an ES7-style theme decorator that you can use to apply your
          custom theme. Keep in mind that in order to use the decorator, you must use the ES6-style <i>class</i> syntax
          to declare your app component. Moreover, React may not be able to automatically bind event handlers
          to your component&#39;s <i>this</i>. Arrow functions allow you to overcome this limitation.
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{decoratorExampleCode}</CodeBlock>
        </Paper>
        <p>
          It is worth pointing out that underneath the covers, the decorator is also using React lifecycle methods
          with the context feature.
        </p>

        <h2 style={styles.headline}>Overriding Theme Variables</h2>

        <p>
          If you would like to make changes to the Theme for a specific pages, include the code
          below in said page. All components defined on this page along with there children will
          use your Theme overrides. The toggle buttons in the <a href="#/components/menus">Menus
          page</a> is an example of this. Notice how these changes do not bleed over on to sibling
          pages such as the <a href="#/components/switches">Switches page</a>.
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{this.getOverrideExamplePage()}</CodeBlock>
        </Paper>


        <h3 style={styles.title}>Giving Custom React Components Access to Theme</h3>
        <p>
          If you would only like to create a React component with access to Theme, include the code
          below at the end of your component&#39;s class definition. This is valid because the usage
          code mentioned earlier had been inserted in the outer most component. <a href='https://github.com/callemall/material-ui/blob/master/docs/src/app/components/code-example/code-example.jsx'>
          CodeExample</a> is an example of a custom component using ThemeManager.
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{customComponentCode}</CodeBlock>
        </Paper>


        <h3 style={styles.title}>Custom Themes</h3>
        <p>
          To see an example containing all theme variables, checkout our <a href="https://github.com/callemall/material-ui/blob/master/src/styles/themes/light-theme.js">
          light-theme</a>. The code-block below defines the structure needed to have a valid custom
          theme. Note that if a property is not defined in the custom theme, the default will be
          what is defined in our light theme.
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{this.getThemeStructure()}</CodeBlock>
        </Paper>

      </div>
    );
  },

  getThemeStructure() {
    let text =
      'let CustomTheme = {\n' +
      '  getPalette() {\n' +
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
      '  getComponentThemes(palette) {\n' +
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
      '        disabledColor: String,\n' +
      '        labelColor: String,\n' +
      '        labelDisabledColor: String\n' +
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
      '        width: Number,\n' +
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
      '        padding: Number,\n' +
      '        selectedTextColor: String,\n' +
      '      },\n' +
      '      menuSubheader: {\n' +
      '        padding: Number,\n' +
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
      '        labelColor: String,\n' +
      '        labelDisabledColor: String\n' +
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
      '        trackRequiredColor: String,\n' +
      '        labelColor: String,\n' +
      '        labelDisabledColor: String\n' +
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
  },

  getComponentGroup() {
    //Standard Actions
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit }
    ];

    let menuItemsNav = [
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
      }
    ];

    let styles = this.getStyles();

    let menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' }
    ];

    return (
      <ClearFix>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true}/>
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label="Secondary" secondary={true} />
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label="Primary"  primary={true}/>
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label="Default"/>
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.container}>
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
            <div style={styles.container}>
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
            <div style={styles.container}>
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

          <div style={this.mergeStyles(styles.group, {marginTop: 0})}>
            <div style={styles.container}>
              <TextField
                style={styles.textfield}
                hintText="TextField"/>
            </div>
            <div style={styles.container}>
              <DatePicker
                hintText="Landscape Dialog"
                mode="landscape"
                style={{width: '100%'}}/>
            </div>
            <div style={styles.container}>
              <DropDownMenu menuItems={menuItems} style={{width: '100%'}}/>
           </div>
          </div>

          <div style={styles.groupSlider}>
            <Slider style={styles.slider} name="slider2" defaultValue={0.5} />
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
              <Dialog ref="dialog" title="Dialog With Standard Actions" actions={standardActions}>
                The actions in this window are created from the json that&#39;s passed in.
              </Dialog>
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FlatButton
                  onTouchTap={this.handleClickNav}
                  label="View LeftNav" />
              <LeftNav ref="leftNav" docked={false} menuItems={menuItemsNav} />
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
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
      </ClearFix>
    );
  },

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
  },

  getOverrideExamplePage() {
    return (
      'let React = require(\'react\');\n' +
      'let mui = require(\'mui\');\n' +
      'let ThemeManager = new mui.Styles.ThemeManager();\n\n' +
      'class MenusPage extends React.Component {\n\n' +
      '  getChildContext() { \n' +
      '    return {\n' +
      '      muiTheme: ThemeManager.getCurrentTheme()\n' +
      '    }\n' +
      '  }\n\n' +
      '  componentWillMount() {\n' +
      '    ThemeManager.setComponentThemes({\n' +
      '      toggle: {\n' +
      '        thumbOnColor: String,\n' +
      '        trackOnColor: String,\n' +
      '      }\n' +
      '    });\n' +
      '  }\n' +
      '}\n\n' +
      'MenusPage.childContextTypes = {\n' +
      '  muiTheme: React.PropTypes.object\n' +
      '};'
    );
  },


  // Toggles between light and dark themes
  onTabChange(tabIndex, tab) {
    let newMuiTheme = null;

    if (!this.state.isThemeDark) {
      newMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
      
    } 
    else {
      newMuiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
    }

    this.setState({muiTheme: newMuiTheme,
      isThemeDark: !this.state.isThemeDark});
  },

  handleAction(e) {
    this.refs.snackbar.dismiss();
  },

  handleClickNav(e) {
    this.refs.leftNav.toggle();
  },

  handleClickSnackbar(e) {
    this.refs.snackbar.show();
  },

  handleTouchTapDialog(e) {
    this.refs.dialog.show();
  },

  _onDialogSubmit() {
    console.log('Submitting');
  }
});

module.exports = ThemesPage;
