var React = require('react'),
  mui = require('mui'),
  CodeBlock = require('../code-example/code-block.jsx');

var GetStarted = React.createClass({

  render: function() {
    var usageCode =
          '/**\n' +
          ' * @jsx React.DOM\n' +
          '*/\n\n' +
          'var React = require(\'react\'),\n' +
          '  mui = require(\'material-ui\'),\n' +
          '  RaisedButton = mui.RaisedButton;\n\n' +
          'var SomeAwesomeComponent = React.createClass({\n\n' +
          '  render: function() {\n' +
          '    return (\n' +
          '        <RaisedButton label="Default" />\n' +
          '    );\n' +
          '  }\n\n' +
          '});\n\n' +
          'module.exports = SomeAwesomeComponent;',

      customizationCode = 
        '@import "node_modules/material-ui/dist/less/scaffolding.less";\n\n' +
        '//Define a custom less file to override\n//any variables defined in scaffolding.less\n' +
        '@import "my-custom-overrides.less";\n\n' +
        '@import "node_modules/material-ui/dist/less/components.less";',

      usageNotesCode =
        'var injectTapEventPlugin = require("react-tap-event-plugin");\n\n' +
        '//Needed for onTouchTap\n' +
        '//Can go away when react 1.0 release\n' +
        '//Check this repo:\n' +
        '//https://github.com/zilverline/react-tap-event-plugin\n' +
        'injectTapEventPlugin();\n';

    return (
      <div className="get-started-page mui-app-content-canvas">
        <div className="full-width-section">

          <h2 className="mui-font-style-headline">Installation</h2>
          <p>
            Material-UI is available as an <a href="https://www.npmjs.org/package/material-ui">npm package</a>. 
            Use <a href="http://browserify.org/">browserify</a> and <a href="https://github.com/andreypopp/reactify">reactify</a> for
            dependency management and JSX transformation. The CSS framework is written in <a href="http://lesscss.org/">Less</a>,
            so you'll need to compile that as well. For <a href="http://www.sass-lang.com/">Sass</a> users, <a href="https://github.com/gpbl/material-ui-sass">material-ui-sass</a> contains
            the .scss version of the Less framework.
          </p>

          <h3 className="mui-font-style-title">React-Tap-Event-Plugin</h3>
          <p>
            Some components uses <a href="https://github.com/zilverline/react-tap-event-plugin">react-tap-event-plugin</a> to
            listen for touch events. This dependency is temporary and will go away once react v1.0 is released. Until then, be
            sure to inject this plugin at the start of your app.
          </p>
          <mui.Paper className="code-example">
            <CodeBlock>{usageNotesCode}</CodeBlock>
          </mui.Paper>

          <h3 className="mui-font-style-title">Roboto Font</h3>
          <p>
            Be sure to include the <a href="http://www.google.com/fonts/specimen/Roboto">Roboto</a> font
            in your project. Here are <a href="http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500">some instructions</a> on how to include it in your project.
          </p>

          <h2 className="mui-font-style-headline">Usage</h2>
          <p>
            Once material-ui is included in your project, you can use the components this way:
          </p>
          <mui.Paper className="code-example">
            <CodeBlock>{usageCode}</CodeBlock>
          </mui.Paper>

          <h2 className="mui-font-style-headline">Customization</h2>
          <p>The styles are separated into 2 less files:</p>
          <li>dist/less/scaffolding.less</li>
          <li>dist/less/components.less</li>
          <p>
            This allows you to override any variables defined in custom-variables.less without having to
            modify material-ui source files directly. For example, your main.less file could look something like this:
          </p>
          <mui.Paper className="code-example">
            <CodeBlock>{customizationCode}</CodeBlock>
          </mui.Paper>

          <h2 className="mui-font-style-headline">Examples</h2>
          <p>
            There are 2 projects that you can look at to help you get started. The first project can be found
            in the <a href="https://github.com/callemall/material-ui/tree/master/example">example folder</a>. This
            is a basic project that shows how you can consume material-ui components in your own project.
          </p>
          <p>
            The second project is the actual documentation site. This is a more complex project but will give
            examples of every component. Check out the <a href="https://github.com/callemall/material-ui/tree/master/docs">docs folder</a> for
            build instructions.
          </p>

        </div>
      </div>
    );
  }

});

module.exports = GetStarted;
