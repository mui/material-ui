const React = require('react');
const { Paper, Styles } = require('material-ui');
const CodeBlock = require('../../code-example/code-block');

const { Spacing, Typography } = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const Installation = React.createClass({

  contextTypes : {
    muiTheme: React.PropTypes.object,
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    return {
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      codeExample: {
        backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
        marginBottom: '32px',
      },
      inlineCode: {
        backgroundColor: '#F8F8F8',
      },
    };
  },

  render() {
    let usageCode =
        '//Basic React component that renders a material-ui\n' +
        '//raised button with the text \"Default\"\n\n' +
        'const React = require(\'react\');\n' +
        'const RaisedButton = require(\'material-ui/lib/raised-button\');\n\n' +
        'const MyAwesomeReactComponent = React.createClass({\n' +
        '  render() {\n' +
        '    return (\n' +
        '        <RaisedButton label="Default" />\n' +
        '    );\n' +
        '  },\n' +
        '});\n\n' +
        'module.exports = MyAwesomeReactComponent;\n',

      customizationCode =
        '@import "node_modules/material-ui/src/less/scaffolding.less";\n\n' +
        '//Define a custom less file to override\n//any variables defined in scaffolding.less\n' +
        '@import "my-custom-overrides.less";\n\n' +
        '@import "node_modules/material-ui/src/less/components.less";',

      usageNotesCode =
        'let injectTapEventPlugin = require("react-tap-event-plugin");\n\n' +
        '//Needed for onTouchTap\n' +
        '//Can go away when react 1.0 release\n' +
        '//Check this repo:\n' +
        '//https://github.com/zilverline/react-tap-event-plugin\n' +
        'injectTapEventPlugin();\n',

      noticeCode1 =
        'const RaisedButton = require(\'material-ui/lib/raised-button\');\n',

      noticeCode2 =
        'const Mui = require(\'material-ui\');\n' +
        'const RaisedButton = Mui.RaisedButton;\n';

    let styles = this.getStyles();

    return (
      <div>

        <h2 style={styles.headline}>Installation</h2>
        <p>
          Material-UI is available as an <a href="https://www.npmjs.org/package/material-ui">npm package</a>.
          After npm install, you will find all the .jsx files in the /src folder and their compiled versions in the /lib folder.
        </p>

        <h3 style={styles.title}>React-Tap-Event-Plugin</h3>
        <p>
          Some components use <a href="https://github.com/zilverline/react-tap-event-plugin">react-tap-event-plugin</a> to
          listen for touch events. This dependency is temporary and will go away once react v1.0 is released. Until then, be
          sure to inject this plugin at the start of your app.
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{usageNotesCode}</CodeBlock>
        </Paper>

        <h3 style={styles.title}>Roboto Font</h3>
        <p>
          Material-UI was designed with the <a href="http://www.google.com/fonts/specimen/Roboto">Roboto</a> font in mind. So be sure to include
          it in your project. Here are <a href="http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500">some instructions</a> on
          how to do so.
        </p>

        <h2 style={styles.headline}>Usage</h2>
        <p>
          Using material-ui components is very straightforward. Once material-ui is included in your project, you can use the components this way:
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{usageCode}</CodeBlock>
        </Paper>
        <p>
          Notice that in the above example, we called:
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{noticeCode1}</CodeBlock>
        </Paper>
        <p>
        instead of
        </p>
        <Paper style={styles.codeExample}>
          <CodeBlock>{noticeCode2}</CodeBlock>
        </Paper>
        <p>
          It is good practice to require only those components of Material-UI that your app needs, instead of requiring all of
          Material-UI. This will make your build process faster and your build output smaller. For a complete mapping of Material-UI
          components to <code style={styles.inlineCode}>require()</code> calls, see /lib/index.js inside the Material-UI
          root directory.
        </p>

        <h2 style={styles.headline}>Customization</h2>
        <p>We have implemented a default theme to render all Material-UI components. Styling components to your liking is simple and hassle-free.
        This can be achieved in the following two ways:</p>
        <li><a href="#/customization/themes">Use a custom theme to style components</a></li>
        <li><a href="#/customization/inline-styles">Override individual component styles via the style prop</a></li>

      </div>
    );
  },

});

module.exports = Installation;
