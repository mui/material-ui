let React = require('react/addons');
let { ClearFix, Mixins, SelectField, TextField } = require('material-ui');
let ComponentDoc = require('../../component-doc');

let { StyleResizable } = Mixins;


let TextFieldsPage = React.createClass({

  mixins: [StyleResizable, React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      errorText: 'This field is required.',
      error2Text: 'This field must be numeric.',
      floatingErrorText: 'This field is required.',
      floatingError2Text: 'This field must be numeric.',
      propValue: 'Prop Value',
      floatingPropValue: 'Prop Value',
      valueLinkValue: 'Value Link',
      selectValue: undefined,
      selectValue2: undefined,
      selectValueLinkValue: 4,
      floatingValueLinkValue: 'Value Link'
    };
  },

  getStyles() {
    let styles = {
      group: {
        width: '100%',
        float: 'left',
        marginBottom: 32
      },
      textfield: {
        marginTop: 24
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.group.width = '50%';
    }

    return styles;
  },

  render() {

    let code =
      '//In Line Hint Text\n' +
      '<TextField\n' +
      '  hintText="Hint Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  defaultValue="Default Value" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  value={this.state.propValue}\n' +
      '  onChange={this._handleInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  valueLink={this.linkState(\'valueLinkValue\')} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text (MultiLine)"\n' +
      '  multiLine={true} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.errorText}\n' +
      '  onChange={this._handleErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.error2Text}\n' +
      '  onChange={this._handleError2InputChange}\n' +
      '  defaultValue="abc" />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true} />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  defaultValue="Disabled With Value" />\n\n' +

      '//Select Fields\n'+
      '<SelectField\n'+
      '  value={this.state.selectValue}\n'+
      '  onChange={this._handleSelectValueChange.bind(null, "selectValue")}\n'+
      '  hintText="Hint Text"\n'+
      '  menuItems={menuItems} />\n'+
      '<SelectField\n'+
      '  valueLink={this.linkState("selectValueLinkValue")}\n'+
      '  floatingLabelText="Select Field"\n'+
      '  valueMember="id"\n'+
      '  displayMember="name"\n'+
      '  menuItems={arbitraryArrayMenuItems} />\n'+
      '<SelectField\n'+
      '  value={this.state.selectValue2}\n'+
      '  onChange={this._handleSelectValueChange.bind(null, "selectValue2")}\n'+
      '  menuItems={arbitraryArrayMenuItems} />\n\n'+

      '//Floating Hint Text Labels\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  defaultValue="Default Value"\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  value={this.state.floatingPropValue}\n' +
      '  onChange={this._handleFloatingInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  valueLink={this.linkState(\'floatingValueLinkValue\')} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text (MultiLine)"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  multiLine={true} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.floatingErrorText}\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  onChange={this._handleFloatingErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.floatingError2Text}\n' +
      '  defaultValue="abc"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  onChange={this._handleFloating2ErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  defaultValue="Disabled With Value"\n' +
      '  floatingLabelText="Floating Label Text" />\n'+
      '<TextField\n' +
      '  hintText="Custom Child input (e.g. password)"\n' +
      '  defaultValue="Custom Child input (e.g. password)"\n' +
      '  floatingLabelText="Custom Child input (e.g. password)">\n' +
      '    <input type="password" />\n' +
      '</TextField>\n'+
      '<TextField\n' +
      '  hintText="Disabled Child input (e.g. password)"\n' +
      '  disabled={true}\n' +
      '  defaultValue="Custom Child input (e.g. password)"\n' +
      '  floatingLabelText="Custom Child input (e.g. password)">\n' +
      '    <input type="password" />\n' +
      '</TextField>';

    let desc = 'This component extends the current input element and will support all of its props and events. It supports ' +
      'valueLink and can be controlled or uncontrolled.' ;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'errorStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override error styles.'
          },
          {
            name: 'errorText',
            type: 'string',
            header: 'optional',
            desc: 'The error text string to display.'
          },
          {
            name: 'floatingLabelText',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the floating label element.'
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, the field receives the property width 100%.'
          },
          {
            name: 'hintText',
            type: 'string',
            header: 'optional',
            desc: 'The hint text string to display.'
          },
          {
            name: 'multiLine',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.'
          },
          {
            name: 'onEnterKeyDown',
            type: 'function',
            header: 'optional',
            desc: 'The function to call when the user presses the Enter key.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s root element.'
          },
          {
            name: 'type',
            type: 'string',
            header: 'optional',
            desc: 'Specifies the type of input to display such as "password" or "text".'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'blur',
            header: 'TextField.blur()',
            desc: 'Removes focus on the input element.'
          },
          {
            name: 'clearValue',
            header: 'TextField.clearValue()',
            desc: 'Clears the value on the input element.'
          },
          {
            name: 'focus',
            header: 'TextField.focus()',
            desc: 'Sets the focus on the input element.'
          },
          {
            name: 'getValue',
            header: 'TextField.getValue()',
            desc: 'Returns the value of the input.'
          },
          {
            name: 'setErrorText',
            header: 'TextField.setErrorText(newErrorText)',
            desc: 'Sets the error text on the input element.'
          },
          {
            name: 'setValue',
            header: 'TextField.setValue(newValue)',
            desc: 'Sets the value of the input element.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield loses' +
                  'focus.'
          },
          {
            name: 'onChange',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield\'s value ' +
                  'changes.'
          },
          {
            name: 'onFocus',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield gains ' +
                  'focus.'
          },
        ]
      }
    ];

    let styles = this.getStyles();
    let menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];
    let arbitraryArrayMenuItems = [
      {id:1, name:'Never'},
      {id:2, name:'Every Night'},
      {id:3, name:'Weeknights'},
      {id:4, name:'Weekends'},
      {id:5, name:'Weekly'}
    ];

    return (
      <ComponentDoc
        name="Text Field"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <ClearFix>
          <div style={styles.group}>
            <TextField
              style={styles.textfield}
              hintText="Hint Text" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              defaultValue="Default Value" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              value={this.state.propValue}
              onChange={this._handleInputChange} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              valueLink={this.linkState('valueLinkValue')} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text (MultiLine)"
              multiLine={true} /><br/>
            <TextField
              style={styles.textfield}
              hintText="The hint text can be as long as you want, it will wrap."
              multiLine={true} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              errorText="The error text can be as long as you want, it will wrap." /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              errorText={this.state.errorText}
              onChange={this._handleErrorInputChange} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              errorText={this.state.error2Text}
              onChange={this._handleError2InputChange}
              defaultValue="abc" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Disabled Hint Text"
              disabled={true} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Disabled Hint Text"
              disabled={true}
              defaultValue="Disabled With Value" /><br/>
            <SelectField
              style={styles.textfield}
              value={this.state.selectValue}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
              hintText="Hint Text"
              menuItems={menuItems} /><br/>
            <SelectField
              valueLink={this.linkState('selectValueLinkValue')}
              floatingLabelText="Float Label Text"
              valueMember="id"
              displayMember="name"
              menuItems={arbitraryArrayMenuItems} /><br/>
            <SelectField
              style={styles.textfield}
              value={this.state.selectValue2}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue2')}
              menuItems={arbitraryArrayMenuItems} />
          </div>
          <div style={styles.group}>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Hint Text"
              defaultValue="Default Value"
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              value={this.state.floatingPropValue}
              onChange={this._handleFloatingInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              valueLink={this.linkState('floatingValueLinkValue')} /><br/>
            <TextField
              hintText="Hint Text (MultiLine)"
              floatingLabelText="Floating Label Text"
              multiLine={true} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.floatingErrorText}
              floatingLabelText="Floating Label Text"
              onChange={this._handleFloatingErrorInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.floatingError2Text}
              defaultValue="abc"
              floatingLabelText="Floating Label Text"
              onChange={this._handleFloating2ErrorInputChange} /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true}
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true}
              defaultValue="Disabled With Value"
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Custom Child input (e.g. password)"
              defaultValue="Custom Child input (e.g. password)"
              floatingLabelText="Custom Child input (e.g. password)">
                <input type="password" />
            </TextField>
            <TextField
              hintText="Disabled Child input (e.g. password)"
              disabled={true}
              defaultValue="Custom Child input (e.g. password)"
              floatingLabelText="Custom Child input (e.g. password)">
                <input type="password" />
            </TextField>
          </div>
        </ClearFix>
      </ComponentDoc>
    );
  },

  _handleErrorInputChange(e) {
    this.setState({
      errorText: e.target.value ? '' : 'This field is required.'
    });
  },

  _handleError2InputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      error2Text: isNumeric ? '' : 'This field must be numeric.'
    });
  },

  _handleFloatingErrorInputChange(e) {
    this.setState({
      floatingErrorText: e.target.value ? '' : 'This field is required.'
    });
  },

  _handleFloating2ErrorInputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      floatingError2Text: isNumeric ? '' : 'This field must be numeric.'
    });
  },

  _handleInputChange(e) {
    this.setState({
      propValue: e.target.value
    });
  },

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  _handleFloatingInputChange(e) {
    this.setState({
      floatingPropValue: e.target.value
    });
  }

});

module.exports = TextFieldsPage;
