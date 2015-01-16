var React = require('react');
var mui = require('mui');
var Checkbox = mui.Checkbox;
var RadioButton = mui.RadioButton;
var Toggle = mui.Toggle;
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentDoc = require('../../component-doc.jsx');

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
        'props below will be passed down to the switch element. Checkboxes can now accept input ' +
        'attributes of type "checkbox" as properties. See checkbox 3 for an example of this.';

    var componentInfo = [
      {
        name: 'Checkbox Props',
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
          },
          {
            name: 'onCheck',
            type: 'function',
            header: 'optional',
            desc: 'Callback function that is called when the checkbox is checked.'
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
          {this._getCheckboxExample()}
          {this._getRadioButtonExample()}
          {this._getToggleExample()}
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
            label="went for a run today"/>
        </div>
        <div className="switches-example-container">
          <Checkbox 
            name="checkboxName2" 
            value="checkboxValue2"
            label="fed the dog"
            defaultChecked={true}/>
        </div>
        <div className="switches-example-container">
          <Checkbox 
            name="checkboxName3" 
            value="checkboxValue3"
            label="built a house on the moon"
            disabled={true}/>
        </div>
      </div>
    );
  },


        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is true"
        //     defaultToggled={true} />
        // </div>
        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is false"
        //     defaultToggled={false} />
        // </div>

        // <div className="switches-example-container">
        //   <Toggle 
        //     label="basic disabled"
        //     disabled={true} />
        // </div>
        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is true and is disabled"
        //     defaultToggled={true}
        //     disabled={true}/>
        // </div>
        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is false and is disabled"
        //     disabled={true}
        //     defaultToggled={false} />
        // </div>

        // <div className="switches-example-container">
        //   <Toggle 
        //     label="basic and disabled is false"
        //     disabled={false} />
        // </div>
        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is true and disabled is false"
        //     disabled={false}
        //     defaultToggled={true}/>
        // </div>
        // <div className="switches-example-container">
        //   <Toggle 
        //     label="default is false and disabled is false"
        //     disabled={false}
        //     defaultToggled={false} />
        // </div>


        // <div className="switches-example-container">
        //   <Toggle 
        //     ref="toggleA"
        //     label="I can't be toggled with onTouchTap."
        //     disabled={true}
        //     onToggle={this._handleToggle} />
        // </div>
        // <div className="switches-example-container">
        //   <Toggle
        //     ref="toggleB"
        //     label="But I can toggle you programmatically!"
        //     onToggle={this._handleToggle} />
        // </div>


        // <div className="switches-example-container">
        //   <Toggle
        //     label="required"
        //     required={true} />
        // </div>


  _getToggleExample: function() {

    return (
      <div className="switches-example-group">

        <div className="switches-example-container">
          <h2 className="mui-font-style-headline">Toggle</h2>
        </div>

        <div className="switches-example-container">
          <Toggle 
            name="toggleName"
            value="toggleValue"
            label="basic" />
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
    this.refs.toggleA.setToggled(!this.refs.toggleB.isToggled());
  },

  _onRadioButtonClick: function(e, checked) {
    console.log('Clicked:', checked);
  }

});

module.exports = SwitchesPage;
