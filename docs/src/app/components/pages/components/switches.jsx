var React = require('react'),
    mui = require('mui'),
    Checkbox = mui.Checkbox,
    RadioButton = mui.RadioButton,
    Toggle = mui.Toggle,
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
          <Checkbox
            name="checkboxName"
            value="checkboxValue1"
            onClick={this._onCheck} />
          <br />

          <Checkbox
            name="checkboxName"
            value="checkboxValue2"
            onClick={this._onCheck} />
          <br />

          <Checkbox
            name="checkboxName"
            value="checkboxValue3"
            onClick={this._onCheck} />
        </form> 
      </CodeExample>
    );
  },

  _getToggleExample: function() {
    var code = 
      '<Toggle />';

    return (
      <CodeExample code={code}>
        <Toggle onToggle={this._handleToggle} />
      </CodeExample>
    );
  },

  _getRadioButtonExample: function() {
    var code = 
      '<form>\n' +
      ' <RadioButton name="shipSpeed" value="light" label="prepare for light speed"/>\n' +
      ' <RadioButton name="shipSpeed" value="not_light" label="light speed too slow" defaultChecked={true}/>\n' +
      ' <RadioButton name="shipSpeed" value="ludicrous" label="go to ludicous speed"/>\n' +
      '</form>';

    return (
      <CodeExample code={code}>
        <form>
          <RadioButton
            name="shipSpeed"
            value="light"
            label="prepare for light speed"
            onClick={this._onRadioButtonClick} />
          <br />

          <RadioButton
            name="shipSpeed"
            value="not_light"
            label="light speed too slow"
            defaultChecked={true}
            onClick={this._onRadioButtonClick} />
          <br />

          <RadioButton
            name="shipSpeed"
            value="ludicrous"
            label="go to ludicrous speed"
            onClick={this._onRadioButtonClick} />
        </form>
      </CodeExample>
    );
  },

  _onCheck: function(e, checked) {
    console.log('Checked: ', checked);
  },

  _handleToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  },

  _onRadioButtonClick: function(e, checked) {
    console.log('Clicked:', checked);
  }

});

module.exports = SwitchesPage;
