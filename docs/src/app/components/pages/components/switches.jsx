/**
 * @jsx React.DOM
 */

var React = require('react'),
    mui = require('mui'),
    CodeExample = require('../../code-example/code-example.jsx');

var SwitchesPage = React.createClass({

  render: function() {
    return (
    	<div>
        <h2 className="mui-font-style-headline">Checkbox</h2>
        {this._getCheckboxExample()}
        <h2 className="mui-font-style-headline">Radio Button</h2>
        {this._getRadioButtonExample()}
    		<h2 className="mui-font-style-headline">Toggle</h2>
        {this._getToggleExample()}
    	</div>
    );
  },

  _getCheckboxExample: function() {
    var code = 
      '<form>\n' +
      ' <Checkbox name="checkboxName" value="checkboxValue1" />\n' +
      ' <Checkbox name="checkboxName" value="checkboxValue2" />\n' +
      ' <Checkbox name="checkboxName" value="checkboxValue3" />\n' +
      '</form>';

    return (
      <CodeExample code={code}>
        <form>
          <mui.Checkbox name="checkboxName" value="checkboxValue1" onClick={this._onCheck} />
          <br />
          <mui.Checkbox name="checkboxName" value="checkboxValue2" onClick={this._onCheck} />
          <br />
          <mui.Checkbox name="checkboxName" value="checkboxValue3" onClick={this._onCheck} />
        </form> 
      </CodeExample>
    );
  },

  _getToggleExample: function() {
    var code = 
      '<Toggle />';

    return (
      <CodeExample code={code}>
        <mui.Toggle onToggle={this._onToggle} />
      </CodeExample>
    );
  },

  _getRadioButtonExample: function() {
    var code = 
      '<form>\n' +
      ' <RadioButton name="radioButtonName" value="radioButtonValue1"/>\n' +
      ' <RadioButton name="radioButtonName" value="radioButtonValue2"/>\n' +
      ' <RadioButton name="radioButtonName" value="radioButtonValue3"/>\n' +
      '</form>';

    return (
      <CodeExample code={code}>
        <form>
          <mui.RadioButton name="radioButtonName" value="radioButtonValue1" onClick={this._onRadioButtonClick} />
          <br />
          <mui.RadioButton name="radioButtonName" value="radioButtonValue2" onClick={this._onRadioButtonClick} />
          <br />
          <mui.RadioButton name="radioButtonName" value="radioButtonValue3" onClick={this._onRadioButtonClick} />
        </form>
      </CodeExample>
    );
  },

  _onCheck: function(e, checked) {
    console.log('Checked: ', checked);
  },

  _onToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  },

  _onRadioButtonClick: function(e, checked) {
    console.log('Clicked:', checked);
  }

});

module.exports = SwitchesPage;