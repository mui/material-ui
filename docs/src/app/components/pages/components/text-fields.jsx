const React = require('react');
const { ClearFix, Mixins, SelectField, TextField, Styles, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const { Colors } = Styles;
const { StyleResizable } = Mixins;
const Code = require('text-fields-code');
const CodeExample = require('../../code-example/code-example');
const LinkedStateMixin = require('react-addons-linked-state-mixin');
const CodeBlock = require('../../code-example/code-block');

const TextFieldsPage = React.createClass({

  mixins: [StyleResizable, LinkedStateMixin],

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
      selectValueLinkValue2: 3,
      floatingValueLinkValue: 'Value Link',
    };
  },

  getStyles() {
    let styles = {
      group: {
        width: '100%',
        float: 'left',
        marginBottom: 32,
      },
      textfield: {
        marginTop: 24,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.group.width = '50%';
    }

    return styles;
  },

  render() {

    let desc = 'This component extends the current input element and will support all of its props and events. It supports ' +
      'valueLink and can be controlled or uncontrolled.';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'defaultValue',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the default value.',
          },
          {
            name: 'errorStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override error styles.',
          },
          {
            name: 'errorText',
            type: 'string',
            header: 'optional',
            desc: 'The error text string to display.',
          },
          {
            name: 'floatingLabelStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override floating label styles.',
          },
          {
            name: 'floatingLabelText',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the floating label element.',
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, the field receives the property width 100%.',
          },
          {
            name: 'hintStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s hint text element.',
          },
          {
            name: 'hintText',
            type: 'string',
            header: 'optional',
            desc: 'The hint text string to display.',
          },
          {
            name: 'inputStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s input element.',
          },
          {
            name: 'multiLine',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.',
          },
          {
            name: 'rows',
            type: 'string',
            header: 'default: 1',
            desc: 'Number of rows to display when multiLine option is set to true.',
          },
          {
            name: 'rowsMax',
            type: 'string',
            header: 'default: null',
            desc: 'Maximum number of rows to display when multiLine option is set to true.',
          },
          {
            name: 'onEnterKeyDown',
            type: 'function',
            header: 'optional',
            desc: 'The function to call when the user presses the Enter key.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s root element.',
          },
          {
            name: 'underlineStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s underline element.',
          },
          {
            name: 'underlineFocusStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s underline element when focussed.',
          },
          {
            name: 'underlineDisabledStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s underline element when disabled.',
          },
          {
            name: 'type',
            type: 'string',
            header: 'optional',
            desc: 'Specifies the type of input to display such as "password" or "text".',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'blur',
            header: 'TextField.blur()',
            desc: 'Removes focus on the input element.',
          },
          {
            name: 'clearValue',
            header: 'TextField.clearValue()',
            desc: 'Clears the value on the input element.',
          },
          {
            name: 'focus',
            header: 'TextField.focus()',
            desc: 'Sets the focus on the input element.',
          },
          {
            name: 'getValue',
            header: 'TextField.getValue()',
            desc: 'Returns the value of the input.',
          },
          {
            name: 'setErrorText',
            header: 'TextField.setErrorText(newErrorText)',
            desc: 'Sets the error text on the input element.',
          },
          {
            name: 'setValue',
            header: 'TextField.setValue(newValue)',
            desc: 'Sets the value of the input element.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'function(event)',
            desc: 'Callback function that is fired when the textfield loses' +
                  'focus.',
          },
          {
            name: 'onChange',
            header: 'function(event)',
            desc: 'Callback function that is fired when the textfield\'s value ' +
                  'changes.',
          },
          {
            name: 'onFocus',
            header: 'function(event)',
            desc: 'Callback function that is fired when the textfield gains ' +
                  'focus.',
          },
        ],
      },
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
      {id:5, name:'Weekly'},
    ];

    return (
      <ComponentDoc
        name="Text Field"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst TextField = require(\'material-ui/lib/text-field\');\n' +
            'const SelectField = require(\'material-ui/lib/select-field\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <ClearFix>
            <div style={styles.group}>
              <TextField
                style={styles.textfield}
                hintText="Hint Text" /><br/>
              <TextField
                style={styles.textfield}
                hintText="Styled Hint Text"
                hintStyle={{color: 'red'}} /><br/>
              <TextField
                style={styles.textfield}
                hintText="Hint Text"
                defaultValue="Default Value" /><br/>
              <TextField
                style={styles.textfield}
                hintText="Custom Underline Color"
                value={this.state.propValue}
                underlineStyle={{borderColor:Colors.green500}}
                onChange={this._handleInputChange} /><br/>
              <TextField
                style={styles.textfield}
                hintText="Custom Underline Focus Color"
                underlineFocusStyle={{borderColor: Colors.amber900}} /><br />
              <TextField
                style={styles.textfield}
                disabled={true}
                hintText="Custom Underline Disabled Style"
                underlineDisabledStyle={{borderColor:Colors.purple500, borderBottom: 'solid 1px'}} /><br />
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
                rows={2}
                rowsMax={4}
                hintText="Hint Text (MultiLine) with rows: 2 and rowsMax: 4."
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
                hintText="Hint Text (custom error color)"
                errorText={this.state.error2Text}
                errorStyle={{color:Colors.orange500}}
                onChange={this._handleError2InputChange}
                defaultValue="Custom error color" /><br/>
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
                valueLink={this.linkState('selectValueLinkValue2')}
                floatingLabelText="Float Custom Label Text"
                floatingLabelStyle={{color: "red"}}
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
                hintText="Password Field"
                floatingLabelText="Password"
                type="password" /><br/>
            </div>
          </ClearFix>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _handleErrorInputChange(e) {
    this.setState({
      errorText: e.target.value ? '' : 'This field is required.',
    });
  },

  _handleError2InputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      error2Text: isNumeric ? '' : 'This field must be numeric.',
    });
  },

  _handleFloatingErrorInputChange(e) {
    this.setState({
      floatingErrorText: e.target.value ? '' : 'This field is required.',
    });
  },

  _handleFloating2ErrorInputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      floatingError2Text: isNumeric ? '' : 'This field must be numeric.',
    });
  },

  _handleInputChange(e) {
    this.setState({
      propValue: e.target.value,
    });
  },

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  _handleFloatingInputChange(e) {
    this.setState({
      floatingPropValue: e.target.value,
    });
  },

});

module.exports = TextFieldsPage;
