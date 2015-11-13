const React = require('react');
const { ClearFix, Mixins, SelectField, Styles, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const { StyleResizable } = Mixins;
const Code = require('select-fields-code');
const CodeExample = require('../../code-example/code-example');
const LinkedStateMixin = require('react-addons-linked-state-mixin');
const CodeBlock = require('../../code-example/code-block');

const SelectFieldsPage = React.createClass({

  mixins: [StyleResizable, LinkedStateMixin],

  getInitialState() {
    return {
      selectValue: undefined,
      selectValue2: undefined,
      selectValueLinkValue: 4,
      selectValueLinkValue2: 3,
    };
  },

  getStyles() {
    let styles = {
      textfield: {
        marginTop: 24,
      },
    };

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
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the text field if set to true.',
          },
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
            type: 'number',
            header: 'default: 1',
            desc: 'Number of rows to display when multiLine option is set to true.',
          },
          {
            name: 'rowsMax',
            type: 'number',
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

    let styles = this.getStyles();

    return (
      <ComponentDoc
        name="Select Field"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\n' +
            'const SelectField = require(\'material-ui/lib/select-field\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <ClearFix>
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
          </ClearFix>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
});

module.exports = SelectFieldsPage;
