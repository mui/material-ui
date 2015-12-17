import React from 'react';
import {ClearFix, Mixins, SelectField, Paper, MenuItem} from 'material-ui';
import ComponentDoc from '../../component-doc';
const {StyleResizable} = Mixins;
import Code from 'select-fields-code';
import CodeExample from '../../code-example/code-example';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import CodeBlock from '../../code-example/code-block';

const SelectFieldsPage = React.createClass({

  mixins: [StyleResizable, LinkedStateMixin],

  getInitialState() {
    return {
      selectValue: undefined,
      selectValue2: 1,
      selectValue3: 1,
      selectValue4: 4,
      selectValue5: 3,
      selectValue6: 2,
    };
  },

  getStyles() {
    let styles = {
      textfield: {
        marginBottom: 24,
      },
    };

    return styles;
  },

  render() {
    let desc = `This component extends the current input element and will support all of its props and events.
      It supports valueLink and can be controlled or uncontrolled.`;

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
            name: 'labelMember',
            type: 'string',
            header: 'default: text',
            desc: 'DropDownMenu will use text as default value, with this ' +
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
            name: 'underlineFocusStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s underline element when focussed.',
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
            header: 'function(event, selectedIndex)',
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
            'import SelectField from \'material-ui/lib/select-field\';\n\n' +
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
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              value={this.state.selectValue4}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue4')}
              floatingLabelText="Float Label Text"
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              value={this.state.selectValue6}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue6')}
              floatingLabelText="With custom label"
            >
              <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
              <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
              <MenuItem value={3} label="5 pm to 9 pm" primaryText="Evening" />
              <MenuItem value={4} label="9 pm to 4 am" primaryText="Night" />
            </SelectField>
            <br/>
            <SelectField
              value={this.state.selectValue5}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue5')}
              floatingLabelText="Float Custom Label Text"
              floatingLabelStyle={{color: 'red'}}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              floatingLabelText="With default value"
              value={this.state.selectValue2}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue2')}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              floatingLabelText="Disabled"
              disabled={true}
              value={4}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              value={this.state.selectValue}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              floatingLabelText="With default value"
              value={this.state.selectValue3}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue3')}
              errorText="This is always wrong"
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
            <SelectField
              value={this.state.selectValue3}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue3')}
              errorText="This is always wrong"
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br/>
          </ClearFix>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _handleSelectValueChange(name, e, index, value) {
    this.setState({[name]: value});
  },
});

export default SelectFieldsPage;
