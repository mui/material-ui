/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  CodeBlock = require('../code-example/code-block.jsx');;

var HomePage = React.createClass({

  render: function() {
    var usageCode =
      '/**\n' +
      ' * @jsx React.DOM\n' +
      '*/\n\n' +
      'var React = require(\'react\'),\n' +
      '  mui = require(\'material-ui\'),\n' +
      '  PaperButton = mui.PaperButton;\n\n' +
      'var SomeAwesomeComponent = React.createClass({\n\n' +
      '  render: function() {\n' +
      '    return (\n' +
      '        <PaperButton type={PaperButton.Types.FLAT} label="Default" />\n' +
      '    );\n' +
      '  }\n\n' +
      '});\n\n' +
      'module.exports = SomeAwesomeComponent;';

    var customizationCode = 
      '@import "node_modules/material-ui/dist/less/scaffolding.less";\n\n' +
      '//Define a custom less file to override\n//any variables defined in scaffolding.less\n' +
      '@import "my-custom-overrides.less";\n\n' +
      '@import "node_modules/material-ui/dist/less/components.less";';

    return (
      <div className="get-started-page">
        <div className="full-width-section">
          <h2 className="mui-font-style-headline">Installation</h2>
          <p className="content">
            Material-UI is available as an <a href="https://www.npmjs.org/package/material-ui">npm package</a>. 
            Use <a href="http://browserify.org/">browserify</a> and <a href="https://github.com/andreypopp/reactify">reactify</a> for
            dependency management and JSX transformation. The CSS framework is written in <a href="http://lesscss.org/">Less</a>,
            so you'll need to compile that as well.
          </p>
        </div>
        
        <div className="full-width-section">
          <div className="content">
            <h2 className="mui-font-style-headline">Usage</h2>
            <p>
              Once material-ui is included in your project, you can use the components this way:
            </p>
            <mui.Paper className="code-example">
              <CodeBlock>{usageCode}</CodeBlock>
            </mui.Paper>
          </div>

          <div className="content">
            <h2 className="mui-font-style-headline">Customization</h2>
            <div>
              <p>The styles are separated into 2 less files:</p>
              <li>dist/less/scaffolding.less</li>
              <li>dist/less/components.less</li>
              <p>
                This allows you to override any variables defined in custom-variables.less without having to
                modify material-ui source files directly. For example, your main.less file could look something like this:
              </p>
            </div>
            <mui.Paper className="code-example">
              <CodeBlock>{customizationCode}</CodeBlock>
            </mui.Paper>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = HomePage;
