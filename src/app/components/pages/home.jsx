/**
 * @jsx React.DOM
 */

var React = require('react'),
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
 			'//Define a custom less file to override any variables defined in scaffolding.less\n' +
 			'@import "my-custom-overrides.less";\n\n' +
 			'@import "node_modules/material-ui/dist/less/components.less";';

    return (
    	<div>
    		<h2 className="mui-font-style-headline">
    			<span className="mui-font-style-display-1">Material-UI</span><br/>
    			A CSS framework and a set of React components that implement Google's Material Design
  			</h2>
    		<p>
    			Material-UI came about from our love
    			of <a href="http://facebook.github.io/react/">React</a> and <a href="https://www.google.com/design/spec/material-design/introduction.html">Google's
    			Material Design</a>. We're currently using it on a project at <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on
    			adding to it and making it better in the coming months.
    		</p>
    	
    		<br/>

    		<h2 className="mui-font-style-headline">Installation</h2>
    		<p>
    			Material-UI is available as an <a href="https://www.npmjs.org/package/material-ui">npm package</a>. 
    			Use <a href="http://browserify.org/">browserify</a> and <a href="https://github.com/andreypopp/reactify">reactify</a> for
    			dependency management and JSX transformation. The CSS framework is written in <a href="http://lesscss.org/">Less</a>,
    			so you'll need to compile that as well.
    		</p>

    		<br/>

    		<h2 className="mui-font-style-headline">Usage</h2>
    		<p>
    			Once material-ui is included in your project, you can use the components this way:
    		</p>
    		<CodeBlock>{usageCode}</CodeBlock>

    		<br/><br/>

    		<h2 className="mui-font-style-headline">Customization</h2>
    		<p>The styles are separated into 2 less files:</p>
    		<li>dist/less/scaffolding.less</li>
    		<li>dist/less/components.less</li>
    		<p>
    			This allows you to override any variables defined in custom-variables.less without having to
    			modify material-ui source files directly. For example, your main.less file could look something like this:
    		</p>
    		<CodeBlock>{customizationCode}</CodeBlock>
    		
    	</div>
    );
  }

});

module.exports = HomePage;
