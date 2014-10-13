/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  CodeExample = require('../code-example/code-example.jsx');

var RadioButtonPage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2 className="mui-font-style-headline">Radio Button</h2>
        {this._getRadioButtonExample()}
    	</div>
    );
  },

  _getRadioButtonExample: function() {
    var code = 
      '<RadioButton />';

    return (
      <CodeExample code={code}>
        <mui.RadioButton onClick={this._onRadioButtonClick} />
      </CodeExample>
    );
  },

  _onRadioButtonClick: function(e, checked) {
    console.log('Clicked:', checked);
  }

});

module.exports = RadioButtonPage;