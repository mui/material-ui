const React = require('react');
const { TimePicker, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('time-picker-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

const TimePickerPage = React.createClass({

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'autoOk',
            type: 'boolean',
            header: 'default: false',
            desc: 'If true, automatically accept and close the picker on set minutes.',
          },
          {
            name: 'defaultTime',
            type: 'date object',
            header: 'optional',
            desc: 'This is the initial time value of the component.',
          },
          {
            name: 'floatingLabelText',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the floating label element.',
          },
          {
            name: 'format',
            type: 'one of: ampm, 24hr',
            header: 'default: ampm',
            desc: 'Tells the component to display the picker in ampm (12hr) format or 24hr format.',
          },
          {
            name: 'hintText',
            type: 'string',
            header: 'optional',
            desc: 'The hint text string to display. Note, floatingLabelText will overide this.',
          },
          {
            name: 'pedantic',
            type: 'boolean',
            header: 'default: false',
            desc: 'It\'s technically more correct to refer to "12 noon" and "12 midnight" rather than "12 a.m." and "12 p.m." and it avoids real confusion between different locales. By default (for compatibility reasons) TimePicker uses (12 a.m./12 p.m.) To use (noon/midnight) set pedantic={true}.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of TimePicker\'s root element.',
          },
          {
            name: 'textFieldStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of TimePicker\'s TextField element.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getTime',
            header: 'TimePicker.getTime()',
            desc: 'Returns the current time value.',
          },
          {
            name: 'setTime',
            header: 'TimePicker.setTime(t)',
            desc: 'Sets the time value to t, where t is a date object.',
          },
          {
            name: 'formatTime',
            header: 'TimePicker.formatTime(time)',
            desc: 'Formats the Date object to a current component\'s time format.',
          },
          {
            name: 'openDialog',
            header: 'TimePicker.openDialog()',
            desc: 'Opens the time-picker dialog programmatically. Use this if you want to open the ' +
            'dialog in response to some event other than focus/tap on the input field, such as an ' +
            'external button click.',
          },
          {
            name: 'focus',
            header: 'TimePicker.focus()',
            desc: 'An alias for the `openDialog()` method to allow more generic use alongside `TextField`.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(null, time)',
            desc: 'Callback function that is fired when the time value ' +
            'changes. The time value is passed in a Date Object.' +
            'Since there is no particular event associated with ' +
            'the change the first argument will always be null and the second ' +
            'argument will be the new Date instance.',
          },
          {
            name: 'onDismiss',
            header: 'function()',
            desc: 'Fired when the timepicker dialog is dismissed.',
          },
          {
            name: 'onFocus',
            header: 'function(event)',
            desc: 'Callback function that is fired when the timepicker field ' +
                  'gains focus.',
          },
          {
            name: 'onShow',
            header: 'function()',
            desc: 'Fired when the timepicker dialog is shown.',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Time Picker"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst TimePicker = require(\'material-ui/lib/time-picker\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <TimePicker
            ref="picker12hr"
            format="ampm"
            hintText="12hr Format"
            onChange={this._changeTimePicker24} />

          <TimePicker
            ref="picker24hr"
            format="24hr"
            hintText="24hr Format"
            onChange={this._changeTimePicker12}  />

          <TimePicker
            ref="pickerAutoOk"
            format="24hr"
            hintText="AutoOk"
            autoOk={true} />

          <TimePicker
            ref="pickerTextfieldStyle"
            format="24hr"
            hintText="Override text field style"
            textFieldStyle={{ fontSize: 'x-large' }} />

          <TimePicker
            ref="pickerStyle"
            format="24hr"
            hintText="Override style"
            textFieldStyle={{ width: '80%' }}
            style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#d1d1d1' }} />

        </CodeExample>
      </ComponentDoc>
    );
  },
  _changeTimePicker24(err, t){
    this.refs.picker24hr.setTime(t);
  },
  _changeTimePicker12(err, t){
    this.refs.picker12hr.setTime(t);
  },

});

module.exports = TimePickerPage;
