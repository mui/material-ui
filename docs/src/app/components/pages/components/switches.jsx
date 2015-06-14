var React = require('react');
var mui = require('mui');
var CodeExample = require('../../code-example/code-example.jsx');
var ComponentDoc = require('../../component-doc.jsx');
var ToggleStar = require('../../svg-icons/toggle-star.jsx');
var ToggleStarBorder = require('../../svg-icons/toggle-star-border.jsx');
var Typography = mui.Styles.Typography;
var {
  Checkbox,
  ClearFix,
  RadioButton,
  RadioButtonGroup,
  Tab,
  Tabs,
  Toggle,
  RaisedButton
} = mui;

class SwitchesPage extends React.Component {

  constructor(props) {
    super(props);

    this.codeCheckbox = `
      <Checkbox
        name="checkboxName1"
        value="checkboxValue1"
        label="went for a run today"/>

      <Checkbox
        name="checkboxName2"
        value="checkboxValue2"
        label="fed the dog"
        defaultChecked={true}/>

      <Checkbox
        name="checkboxName3"
        value="checkboxValue3"
        label="built a house on the moon"
        disabled={true}/>

      <Checkbox
        name="checkboxName4"
        value="checkboxValue4"
        checkedIcon={<ToggleStar />}
        unCheckedIcon={<ToggleStarBorder />}
        label="custom icon" />
    `;

    this.codeRadioButton = `
      <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
        <RadioButton
          value="light"
          label="prepare for light speed"
          style={{marginBottom:16}} />
        <RadioButton
          value="not_light"
          label="light speed too slow"
          style={{marginBottom:16}}/>
        <RadioButton
          value="ludicrous"
          label="go to ludicrous speed"
          style={{marginBottom:16}}
          disabled={true}/>
      </RadioButtonGroup>
    `;

    this.codeToggle = `
      <Toggle
        name="toggleName1"
        value="toggleValue1"
        label="activate thrusters"/>

      <Toggle
        name="toggleName2"
        value="toggleValue2"
        label="auto-pilot"
        defaultToggled={true}/>

      <Toggle
        name="toggleName3"
        value="toggleValue3"
        label="initiate self-destruct sequence"
        disabled={true}/>
    `;

    this.desc = 'These components extend their current input elements (checkbox and radio) and ' +
               'will support all of its props and events. Checkboxes and Toggles support ' +
               'checkedLink';

    this.componentInfo = [
    {
      name: 'Checkbox Props',
      infoArray: [
        {
          name: 'checkedIcon',
          type: 'element',
          header: 'optional',
          desc: 'The SvgIcon to use for the checked state. This is useful to create icon toggles.'
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          header: 'default:false',
          desc: 'The default state of our checkbox component.'
        },
        {
          name: 'iconStyle',
          type: 'object',
          header: 'optional',
          desc: 'Overrides the inline-styles of the icon element.'
        },
        {
          name: 'label',
          type: 'string',
          header: 'optional',
          desc: 'The text that is displayed to the right of the checkbox.'
        },
        {
          name: 'labelPosition',
          type: 'string',
          header: 'default:"right"',
          desc: 'Where the label will be placed next to the checkbox. Options include ' +
                '"left" and "right" (case-sensitive). Default option is "left".'
        },
        {
          name: 'style',
          type: 'object',
          header: 'optional',
          desc: 'Override the inline-styles of the Checkbox\'s root element.'
        },
        {
          name: 'unCheckedIcon',
          type: 'element',
          header: 'optional',
          desc: 'The SvgIcon to use for the unchecked state. This is useful to create icon toggles.'
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
      name: 'Radio Button Props',
      infoArray: [
        {
          name: 'defaultChecked',
          type: 'boolean',
          header: 'default:false',
          desc: 'The default value of the radio button when the page finishes loading.'
        },
        {
          name: 'iconStyle',
          type: 'object',
          header: 'optional',
          desc: 'Overrides the inline-styles of the icon element.'
        },
        {
          name: 'label',
          type: 'string',
          header: 'optional',
          desc: 'The text that is displayed to the right of the radio button.'
        },
        {
          name: 'labelPosition',
          type: 'string',
          header: 'default:"right"',
          desc: 'Where the label will be placed next to the radio button. Options include ' +
                '"left" and "right" (case-sensitive). Default option is "left".'
        },
        {
          name: 'style',
          type: 'object',
          header: 'optional',
          desc: 'Override the inline-styles of the RadioButton\'s root element.'
        },
        {
          name: 'value',
          type: 'string',
          header: 'optional',
          desc: 'The value of our radio button component.'
        }
      ]
    },
    {
      name: 'Radio Button Group',
      infoArray: [
        {
          name: 'defaultSelected',
          type: 'string',
          header: 'optional',
          desc: 'Sets the default radio button to be the one whose value matches ' +
                'defaultSelected (case-sensitive). This will override any individual radio ' +
                'button with the defaultChecked or checked property stated.'
        },
        {
          name: 'labelPosition',
          type: 'string',
          header: 'optional',
          desc: 'Where the label will be placed for all radio buttons. Options include ' +
                '"left" and "right" (case-sensitive). This will override any labelPosition ' +
                'properties defined for an individual radio button.'
        },
        {
          name: 'name',
          type: 'string',
          header: 'required',
          desc: 'The name that will be applied to all radio buttons inside it.'
        },
        {
          name: 'style',
          type: 'object',
          header: 'optional',
          desc: 'Override the inline-styles of the RadioButtonGroup\'s root element.'
        },
        {
          name: 'valueSelected',
          type: 'string',
          header: 'optional',
          desc: 'The value of the currently selected radio button.'
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
          header: 'RadioButtonGroup.setSelectedValue(newSelectionValue)',
          desc: 'Sets the selected radio button to the radio button whose value matches ' +
                'newSelectionValue'
        },
        {
          name: 'clearValue',
          header: 'RadioButtonGroup.clearValue()',
          desc: 'Clears the selected value for the radio button group.'
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
          name: 'defaultToggled',
          type: 'boolean',
          header: 'default:false',
          desc: 'The value of the toggle button. Is true when toggle has been turned on. ' +
            'False otherwise.'
        },
        {
          name: 'elementStyle',
          type: 'object',
          header: 'optional',
          desc: 'Overrides the inline-styles of the Toggle element.'
        },
        {
          name: 'label',
          type: 'string',
          header: 'optional',
          desc: 'The text that is displayed to the right of the toggle switch.'
        },
        {
          name: 'labelPosition',
          type: 'string',
          header: 'default:"left"',
          desc: 'Where the label will be placed next to the toggle switch. Options include ' +
                '"left" and "right" (case-sensitive). Default option is "left".'
        },
        {
          name: 'name',
          type: 'string',
          header: 'optional',
          desc: 'This is the name of the toggle.'
        },
        {
          name: 'style',
          type: 'object',
          header: 'optional',
          desc: 'Override the inline-styles of the Toggle\'s root element.'
        },
        {
          name: 'value',
          type: 'string',
          header: 'optional',
          desc: 'The value of our toggle component.'
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
  }

  getStyles() {
    return {
      container: {
        textAlign: 'left',
        marginBottom: '16px',
        minHeight: '24px'
      },
      group: {
        width: 300
      },
      headline: {
        //mui-font-style-headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      }
    }
  }

  render() {

    return (
      <div>
      <h2 style={this.getStyles().headline}>Switches</h2>
      <Tabs>
        <Tab label="Checkbox">
          <ComponentDoc
            name=""
            code={this.codeCheckbox}
            desc={this.desc}
            componentInfo={this.componentInfo.slice(0,3)}>
            <ClearFix elementType="form">
              {this._getCheckboxExample()}
            </ClearFix>
          </ComponentDoc>
        </Tab>
        <Tab label="RadioButtons">
          <ComponentDoc
            name=""
            code={this.codeRadioButton}
            desc={this.desc}
            componentInfo={this.componentInfo.slice(3,7)}>
            <ClearFix elementType="form">
              {this._getRadioButtonExample()}
            </ClearFix>
          </ComponentDoc>
        </Tab>
        <Tab label="Toggle">
          <ComponentDoc
            name=""
            code={this.codeToggle}
            desc={this.desc}
            componentInfo={this.componentInfo.slice(7)}>
            <ClearFix elementType="form">
              {this._getToggleExample()}
            </ClearFix>
          </ComponentDoc>
        </Tab>
      </Tabs>
      </div>
    );
  }

  _getCheckboxExample() {
    var styles = this.getStyles();
    return (
      <div style={styles.group}>
        <div style={styles.container}>
          <Checkbox
            id="checkboxId1"
            name="checkboxName1"
            value="checkboxValue1"
            label="went for a run today"/>
        </div>
        <div style={styles.container}>
          <Checkbox
            id="checkboxId2"
            name="checkboxName2"
            value="checkboxValue2"
            label="fed the dog"
            defaultChecked={true}/>
        </div>
        <div style={styles.container}>
          <Checkbox
            id="checkboxId3"
            name="checkboxName3"
            value="checkboxValue3"
            label="built a house on the moon"
            disabled={true}/>
        </div>
        <div style={styles.container}>
          <Checkbox
            name="checkboxName4"
            value="checkboxValue4"
            checkedIcon={<ToggleStar />}
            unCheckedIcon={<ToggleStarBorder />}
            label="custom icon" />
        </div>
      </div>
    );
  }

  _getToggleExample() {
    var styles = this.getStyles();
    return (
      <div style={styles.group}>
        <div style={styles.container}>
          <Toggle
            id="toggleId1"
            name="toggleName1"
            value="toggleValue1"
            label="activate thrusters"/>
        </div>
        <div style={styles.container}>
          <Toggle
            id="toggleId2"
            name="toggleName2"
            value="toggleValue2"
            label="auto-pilot"
            defaultToggled={true}/>
        </div>
        <div style={styles.container}>
          <Toggle
            id="toggleId3"
            name="toggleName3"
            value="toggleValue3"
            label="initiate self-destruct sequence"
            disabled={true}/>
        </div>
      </div>
    );
  }

  _getRadioButtonExample() {
    var styles = this.getStyles();
    return (
      <div style={styles.group}>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            id="radioButtonId1"
            value="light"
            label="prepare for light speed"
            style={{marginBottom:16}} />
          <RadioButton
            id="radioButtonId2"
            value="not_light"
            label="light speed too slow"
            style={{marginBottom:16}}/>
          <RadioButton
            id="radioButtonId3"
            value="ludicrous"
            label="go to ludicrous speed"
            style={{marginBottom:16}}
            disabled={true}/>
        </RadioButtonGroup>
      </div>
    );
  }

  _onCheck(e, checked) {
    console.log('Checked: ', checked);
  }

  _onToggle(e, toggled) {
    console.log('Toggled: ', toggled);
  }

  _onRadioButtonClick(e, selected) {
    console.log('Selected: ', selected);
  }
}

module.exports = SwitchesPage;
