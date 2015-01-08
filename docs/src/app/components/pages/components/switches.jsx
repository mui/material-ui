<<<<<<< HEAD
var React = require('react');
var mui = require('mui');
var Checkbox = mui.Checkbox;
var RadioButton = mui.RadioButton;
var Toggle = mui.Toggle;
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentDoc = require('../../component-doc.jsx');
=======
var React = require('react'),
    mui = require('mui'),
    Checkbox = mui.Checkbox,
    RadioButton = mui.RadioButton,
    Toggle = mui.Toggle,
    CodeExample = require('../../code-example/code-example.jsx'),
    ComponentDoc = require('../../component-doc.jsx');;
>>>>>>> ebfee449c693d530c7fa14f80ec05e99fc1ad81e

var SwitchesPage = React.createClass({

  render: function() {

    var code = 
      '//Checkboxes\n' +
      '<Checkbox\n' +
      '  name="checkboxName1"\n' +
      '  value="checkboxValue1" />\n' +
      '<Checkbox\n' +
      '  name="checkboxName2"\n' +
      '  value="checkboxValue2" />\n' +
      '<Checkbox\n' +
      '  name="checkboxName3"\n' +
      '  value="checkboxValue3"\n' + 
      '  checked={true} />\n\n' +
      '//Radio Buttons\n' +
      '<RadioButton\n' +
      '  name="shipSpeed1"\n' +
      '  value="light"\n' +
      '  label="prepare for light speed" />\n' +
      '<RadioButton\n' +
      '  name="shipSpeed2"\n' +
      '  value="not_light"\n' +
      '  label="light speed too slow"\n' +
      '  defaultChecked={true} />\n' +
      '<RadioButton\n' +
      '  name="shipSpeed3"\n' +
      '  value="ludicrous"\n' +
      '  label="go to ludicous speed" />\n\n' +
      '//Toggle\n' +
      '<Toggle />\n';

    var desc = 'This component generates a switches element and all props except for the custom ' +
        'props below will be passed down to the switch element.';

    var componentInfo = [
      {
        name: 'Checkbox',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'This is the name of the checkbox.'
          },
          {
            name: 'value',
            type: 'string',
            header: 'required',
            desc: 'The value of our checkbox component.'
          },
          {
            name: 'checked',
            type: 'boolean',
            header: 'default:false',
            desc: 'The current state of our checkbox component.'
          }
        ]
      },
      {
        name: 'Radio Button',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'The name of the radio button component.'
          },
          {
            name: 'value',
            type: 'string',
            header: 'required',
            desc: 'The value of our radio button component.'
          },
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'The text that is displayed next to the right of the radio button.'
          },
          {
            name: 'defaultChecked',
            type: 'boolean',
            header: 'default:false',
            desc: 'The default value of the radio button when the page finishes loading.'
          }
        ]
      },
      {
        name: 'Toggle',
        infoArray: [
          {
            name: 'onToggle',
            type: 'event',
            header: 'optional',
            desc: 'The function that is called each time the user clicks the toggle button.'
          },
          {
            name: 'toggled',
            type: 'boolean',
            header: 'default:false',
            desc: 'The value of the toggle button. Is true when toggle has been turned on. ' + 
              'False otherwise.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc 
        name="Switches"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <div className="switches-examples">
          <form>
            {this._getCheckboxExample()}
            {this._getRadioButtonExample()}
            {this._getToggleExample()}
          </form>
        </div>

      </ComponentDoc>
    );
  },

  _getCheckboxExample: function() {

    return (
      <div className="switches-example-group">

        <div className="switches-example-container">
          <h2 className="mui-font-style-headline">Checkbox</h2>
        </div>

        <div className="switches-example-container">
          <Checkbox
            name="checkboxName1"
            value="checkboxValue1"
            onClick={this._onCheck} />
        </div>
        <div className="switches-example-container">
          <Checkbox
            name="checkboxName2"
            value="checkboxValue2" 
            onClick={this._onCheck} />
        </div>
       <div className="switches-example-container">
          <Checkbox
            name="checkboxName3"
            value="checkboxValue3"
            checked={true}
            onClick={this._onCheck} />
        </div>

      </div>
    );
  },

  _getToggleExample: function() {

    return (
      <div className="switches-example-group">

        <div className="switches-example-container">
          <h2 className="mui-font-style-headline">Toggle</h2>
        </div>

        <div className="switches-example-container">
          <Toggle onToggle={this._handleToggle} />
        </div>

      </div>
    );
  },

  _getRadioButtonExample: function() {

    return (
      <div className="switches-example-group">

        <div className="switches-example-container">
          <h2 className="mui-font-style-headline">Radio Buttons</h2>
        </div>

      <div className="switches-example-container">
        <RadioButton
          name="shipSpeed1"
          value="light"
          label="prepare for light speed"
          onClick={this._onRadioButtonClick} />
      </div>
      <div className="switches-example-container">
        <RadioButton
          name="shipSpeed2"
          value="not_light"
          label="light speed too slow"
          defaultChecked={true}
          onClick={this._onRadioButtonClick} />
      </div>
      <div className="switches-example-container">
        <RadioButton
          name="shipSpeed3"
          value="ludicrous"
          label="go to ludicrous speed"
          onClick={this._onRadioButtonClick} />
      </div>

    </div>
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
