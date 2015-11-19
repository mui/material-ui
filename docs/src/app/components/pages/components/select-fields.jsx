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
      selectValue2: 1,
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
            desc: 'Disables the select field if set to true.',
          },
          {
            name: 'displayMember',
            type: 'string',
            header: 'default: text',
            desc: 'SelectField will use text as default value, with this ' +
              'property you can choose another name.',
          },
          {
            name: 'errorStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override error styles.',
          },
          {
            name: 'errorText',
            type: 'node',
            header: 'optional',
            desc: 'The error content to display.',
          },
          {
            name: 'floatingLabelStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override floating label styles.',
          },
          {
            name: 'floatingLabelText',
            type: 'node',
            header: 'optional',
            desc: 'The content to use for the floating label element.',
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, the field receives the property width 100%.',
          },
          {
            name: 'hintText',
            type: 'node',
            header: 'optional',
            desc: 'The hint content to display.',
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s icon element.',
          },
          {
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s label when the SelectField is inactive.',
          },
          {
            name: 'valueMember',
            type: 'string',
            header: 'default: payload',
            desc: 'SelectField will use payload as default value, with this ' +
                'property you can choose another name.',
          },
          {
            name: 'menuItemStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the MenuItems when the ' +
                  'SelectField is expanded.',
          },
          {
            name: 'selectedIndex',
            type: 'number',
            header: 'default: 0',
            desc: 'Index of the item selected.',
          },
          {
            name: 'selectFieldRoot',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override the drop-down menu',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s root element.',
          },
          {
            name: 'underlineDisabledStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s underline element when disabled.',
          },
          {
            name: 'underlineStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s underline.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'function(event)',
            desc: 'Callback function that is fired when the selectfield loses' +
                  'focus.',
          },
          {
            name: 'onChange',
            header: 'function(name, event)',
            desc: 'Callback function that is fired when the selectfield\'s value ' +
                  'changes.',
          },
          {
            name: 'onFocus',
            header: 'function(event)',
            desc: 'Callback function that is fired when the selectfield gains ' +
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
              floatingLabelText="With default value"
              style={styles.textfield}
              value={this.state.selectValue2}
              valueMember="id"
              displayMember="name"
              onChange={this._handleSelectValueChange.bind(null, 'selectValue2')}
              menuItems={arbitraryArrayMenuItems} /><br/>
            <SelectField
              floatingLabelText="Disabled"
              disabled={true}
              value={'4'}
              style={styles.textfield}
              menuItems={menuItems} /><br/>
            <SelectField
              value={this.state.selectValue}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
              menuItems={menuItems} />
          </ClearFix>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  },
});

module.exports = SelectFieldsPage;
