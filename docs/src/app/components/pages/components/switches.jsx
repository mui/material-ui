var React = require('react');
var mui = require('mui');
var Checkbox = mui.Checkbox;
var RadioButton = mui.RadioButton;
var RadioButtonGroup = mui.RadioButtonGroup;
var Toggle = mui.Toggle;
var ComponentDoc = require('../../component-doc.jsx');
var RaisedButton = mui.RaisedButton;

var SwitchesPage = React.createClass({

  render: function() {

    var code = 
      '//Checkboxes\n' +
      '<Checkbox\n' +
      '  name="checkboxName1"\n' +
      '  value="checkboxValue1"\n' +
      '  label="went for a run today" />\n' +
      '<Checkbox\n' +
      '  name="checkboxName2"\n' +
      '  value="checkboxValue2"\n' + 
      '  label="fed the dog"\n' +
      '  defaultChecked={true} />\n' +
      '<Checkbox\n' +
      '  name="checkboxName3"\n' +
      '  value="checkboxValue3"\n' + 
      '  label="built a house on the moon"\n' +
      '  disabled={true} />\n\n' +
      '//Radio Buttons\n' +
      '<RadioButtonGroup \n' +
      '  name="shipSpeed"\n' +
      '  defaultSelected="not_light">\n' +
      '    <RadioButton\n' +
      '      value="light"\n' +
      '      label="prepare for light speed" />\n' +
      '    <RadioButton\n' +
      '      value="not_light"\n' +
      '      label="light speed too slow"\n' +
      '      defaultChecked={true} />\n' +
      '   <RadioButton\n' +
      '      value="ludicrous"\n' +
      '      label="go to ludicous speed"\n'+
      '      disabled={true}/>\n' +
      '</RadioButtonGroup>\n\n' +
      '//Toggle\n' +
      '<Toggle\n' +
      '  name="toggleName1"\n' +
      '  value="toggleValue1"\n' +
      '  label="activate thrusters" />\n' +
      '<Toggle\n' +
      '  name="toggleName2"\n' +
      '  value="toggleValue2"\n' +
      '  label="auto-pilot"\n' +
      '  defaultToggled={true} />\n' + 
      '<Toggle\n' +
      '  name="toggleName3"\n' +
      '  value="toggleValue3"\n' +
      '  label="initiate self-destruct sequence"\n' +
      '  disabled={true} />\n\n';

    var desc = 'This component generates a switches element and all props except for the custom ' +
        'props below will be passed down to the switch element. All switch can now accept input ' +
        'attributes of type "checkbox" and "radio" as properties. This can be seen in checkbox ' +
        '3. In it the input attribute "disabled" is included as a property and is handled ' + 
        'accordingly';

    var componentInfo = [
      {
        name: 'Checkbox Props',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'optional',
            desc: 'This is the name of the checkbox.'
          },
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'The value of our checkbox component.'
          },
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'The text that is displayed to the right of the checkbox.'
          },
          {
            name: 'defaultChecked',
            type: 'boolean',
            header: 'default:false',
            desc: 'The default state of our checkbox component.'
          }
        ]
      },
      {
        name: 'Checkbox Methods',
        infoArray: [
          {
            name: 'isChecked',
            header: 'Checkbox.isChecked()',
            desc: 'Returns true if the checkbox is currently checked. Returns false otherwise'
          },
          {
            name: 'setChecked',
            header: 'Checkbox.setChecked(newCheckedValue)',
            desc: 'Sets the checkbox to the value of newCheckedValue. This method cannot be used ' + 
                  'while "checked" is defined as a property.'
          }
        ]
      },
      {
        name: 'Checkbox Events',
        infoArray: [
          {
            name: 'onCheck',
            type: 'function(e, checked)',
            header: 'optional',
            desc: 'Callback function that is fired when the checkbox is checked.'
          }
        ]
      },
      {
        name: 'Radio Button',
        infoArray: [
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'The value of our radio button component.'
          },
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'The text that is displayed to the right of the radio button.'
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
        name: 'Radio Button Group',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'The name that will be applied to all radio buttons inside it.'
          },
          {
            name: 'defaultSelected',
            type: 'string',
            header: 'optional',
            desc: 'Sets the default radio button to be the one whose value matches ' + 
                  'defaultSelected (case-sensitive). This will override any individual radio ' +
                  'button with the defaultChecked or checked property stated.'
          }
        ]
      },
      {
        name: 'Radio Button Group Methods',
        infoArray: [
          {
            name: 'getSelectedValue',
            header: 'RadioButtonGroup.getSelectedValue()',
            desc: 'Returns the string value of the radio button that is currently selected. If nothing ' +
                  'has been selected, an empty string is returned.'
          },
          {
            name: 'setSelectedValue',
            header: 'RadioButtonGroup.setSelectedValue(newSelection)',
            desc: 'Sets the selected radio button to the radio button whose value matches ' +
                  'newSelection'
          }
        ]
      },
      {
        name: 'Radio Button Group Events',
        infoArray: [
          {
            name: 'onChange',
            type: 'function(e, selected)',
            header: 'optional',
            desc: 'Callback function that is fired when a radio button has been clicked. Returns ' + 
                  'the event and the value of the radio button that has been selected.'
          }
        ]
      },


      {
        name: 'Toggle Props',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'optional',
            desc: 'This is the name of the toggle.'
          },
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'The value of our toggle component.'
          },
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'The text that is displayed to the right of the toggle switch.'
          },
          {
            name: 'onToggle',
            type: 'function',
            header: 'optional',
            desc: 'Callback function that is called each time the user clicks the toggle button.'
          },
          {
            name: 'defaultToggled',
            type: 'boolean',
            header: 'default:false',
            desc: 'The value of the toggle button. Is true when toggle has been turned on. ' + 
              'False otherwise.'
          },
          {
            name: 'labelPosition',
            type: 'string',
            header: 'default:"left"',
            desc: 'Where the label will be placed next to the toggle switch. Options include ' + 
                  '"left" and "right" (case-sensitive). Default option is "left".'
          }
        ]
      },
      {
        name: 'Toggle Methods',
        infoArray: [
          {
            name: 'isToggled',
            header: 'Toggle.isToggled()',
            desc: 'Returns true if the checkbox is currently checked. Returns false otherwise'
          },
          {
            name: 'setToggled',
            header: 'Toggle.setToggled(newToggledValue)',
            desc: 'Sets the toggle to the value of newToggledValue. This method cannot be used ' + 
                  'while "checked" is defined as a property.'
          }
        ]
      },
      {
        name: 'Toggle Events',
        infoArray: [
          {
            name: 'onToggle',
            type: 'function(e, toggled)',
            header: 'optional',
            desc: 'Callback function that is fired when the toggle switch is toggled.'
          }
        ]
      },
    ];

    return (
      <ComponentDoc 
        name="Switches"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <form className="switches-examples">
          {this._getCheckboxExample()}
          {this._getRadioButtonExample()}
          {this._getToggleExample()}
        </form>

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
            id="checkboxId1"
            name="checkboxName1" 
            value="checkboxValue1"
            label="went for a run today"
            onCheck={this._onCheck}/>
        </div>
        <div className="switches-example-container">
          <Checkbox
            id="checkboxId2"
            name="checkboxName2" 
            value="checkboxValue2"
            label="fed the dog"
            defaultChecked={true}/>
        </div>
        <div className="switches-example-container">
          <Checkbox
            id="checkboxId3"
            name="checkboxName3" 
            value="checkboxValue3"
            label="built a house on the moon"
            disabled={true}/>
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
          <Toggle
            id="toggleId1"
            name="toggleName1"
            value="toggleValue1"
            label="activate thrusters" 
            onToggle={this._onToggle}/>
        </div>
        <div className="switches-example-container">
          <Toggle
            id="toggleId2"
            name="toggleName2"
            value="toggleValue2"
            label="auto-pilot" 
            defaultToggled={true}/>
        </div>
        <div className="switches-example-container">
          <Toggle 
            onToggle={this._onToggle}
            id="toggleId3"
            name="toggleName3"
            value="toggleValue3"
            label="initiate self-destruct sequence" 
            disabled={true}/>
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

        <RadioButtonGroup 
          name="shipSpeed"
          defaultSelected="not_light"
          onChange={this._onRadioButtonClick}>
            <RadioButton
              id="radioButtonId1"
              value="light"
              label="prepare for light speed"/>
            <RadioButton
              id="radioButtonId2"
              value="not_light"
              label="light speed too slow"/>
            <RadioButton
              id="radioButtonId3"
              value="ludicrous"
              label="go to ludicrous speed"
              disabled={true}/>
        </RadioButtonGroup>

      </div>
    );
  },

  _onCheck: function(e, checked) {
    console.log('Checked: ', checked);
  },

  _onToggle: function(e, toggled) {
    console.log('Toggled: ', toggled);
  },

  _onRadioButtonClick: function(e, selected) {
    console.log('Selected: ', selected);
  },
});

module.exports = SwitchesPage;
