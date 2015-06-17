var React = require('react');
var mui = require('mui');
var CodeBlock = require('../code-example/code-block.jsx');
var FullWidthSection = require('../full-width-section.jsx');
var {Spacing, Typography} = mui.Styles;

class GetStarted extends React.Component {

  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      },
      fullWidthSection: {
        maxWidth: '650px',
        margin: '0 auto'
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
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: '#f00'//Typography.textDarkBlack
      },
      codeExample: {
        backgroundColor: this.context.muiTheme.palette.canvasColor,
        marginBottom: '32px'
      }
    };
  }

  render() {
    var usageCode =
          '/** MyAwesomeReactComponent.jsx */\n\n' +
          'var React = require(\'react\'),\n' +
          '  mui = require(\'material-ui\'),\n' +
          '  RaisedButton = mui.RaisedButton;\n\n' +
          'var SomeAwesomeComponent = React.createClass({\n\n' +
          '  childContextTypes: {\n' +
          '    muiTheme: React.PropTypes.object\n' +
          '  },\n\n' +
          '  getChildContext: function() {\n' +
          '    return {\n' +
          '      muiTheme: ThemeManager.getCurrentTheme()\n' +
          '    };\n' +
          '  },\n\n' +
          '  render: function() {\n' +
          '    return (\n' +
          '        <RaisedButton label="Default" />\n' +
          '    );\n' +
          '  }\n\n' +
          '});\n\n' +
          'module.exports = MyAwesomeReactComponent;\n\n\n',

      customizationCode =
        '@import "node_modules/material-ui/src/less/scaffolding.less";\n\n' +
        '//Define a custom less file to override\n//any variables defined in scaffolding.less\n' +
        '@import "my-custom-overrides.less";\n\n' +
        '@import "node_modules/material-ui/src/less/components.less";',

      usageNotesCode =
        'var injectTapEventPlugin = require("react-tap-event-plugin");\n\n' +
        '//Needed for onTouchTap\n' +
        '//Can go away when react 1.0 release\n' +
        '//Check this repo:\n' +
        '//https://github.com/zilverline/react-tap-event-plugin\n' +
        'injectTapEventPlugin();\n';

    var styles = this.getStyles();

    return (
      <div style={styles.root}>
        <FullWidthSection style={styles.FullWidthSection}>

          <h2 style={styles.headline}>Prerequisites</h2>
          <p>
            We recommend that you get started with the <a href="http://facebook.github.io/react/">React Library</a> before diving into
            material-ui for a better understanding. Should you choose to skip this, don&apos;t worry, we&apos;ll explain relevant React concepts as
            they come along.
          </p>


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
          <mui.Paper style={styles.codeExample}>
            <CodeBlock>{usageNotesCode}</CodeBlock>
          </mui.Paper>

          <h3 style={styles.title}>Roboto Font</h3>
          <p>
            Be sure to include the <a href="http://www.google.com/fonts/specimen/Roboto">Roboto</a> font
            in your project. Here are <a href="http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500">some instructions</a> on how to include it in your project.
          </p>

          <h2 style={styles.headline}>Usage</h2>
          <p>
            Once material-ui is included in your project, you can use the components this way:
          </p>
          <mui.Paper style={styles.codeExample}>
            <CodeBlock>{usageCode}</CodeBlock>
          </mui.Paper>
          <h3 style={styles.title}>Theme</h3>
          <p>
            Please note that since v0.8.0, you also need to <a href="#/customization/themes">define a theme</a> for components to start working.
          </p>

          <h2 style={styles.headline}>Customization</h2>
          <p>Material-UI components have their styles defined inline. There are two approaches to overriding these styles:</p>
          <li><a href="#/customization/inline-styles">Override individual component styles via the style prop</a></li>
          <li><a href="#/customization/themes">Define a Theme to apply overarching style changes</a></li>
          <p>
            This allows you to override any variables used without having to modify material-ui source files directly.
          </p>

          <h2 style={styles.headline}>Examples</h2>
          <p>
            There are 2 projects that you can look at to help you get started. The first project can be found
            in the <a href="https://github.com/callemall/material-ui/tree/master/example">example folder</a>. This
            is a basic project that shows how you can consume material-ui components in your own project.
          </p>
          <p>
            The second project is this documentation site. This is a more complex project but will give
            examples of every component. Check out the <a href="https://github.com/callemall/material-ui/tree/master/docs">docs folder</a> for
            build instructions.
          </p>

        </FullWidthSection>
      </div>
    );
  }

}

GetStarted.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = GetStarted;
