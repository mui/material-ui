const React = require('react');
const { DatePicker, TextField, Paper, Toggle } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('date-picker-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class DatePickerPage extends React.Component {
  constructor(props) {
    super(props);

    let minDate = new Date();
    let maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() -1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() +1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      controlledDate: new Date('2015/07/15'),
    };
  }

  render() {
    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'DateTimeFormat',
            type: 'func',
            header: 'default: custom function defined inside utils/date-time.js that only supports en-US locale',
            desc: 'Constructor for time formatting. Follow this specificaction: ' +
            'ECMAScript Internationalization API 1.0 (ECMA-402).',
          },
          {
            name: 'locale',
            type: 'string',
            header: 'default: en-US',
            desc: 'Locale used for formatting date. If you are not using the default value, ' +
            'you have to provide a DateTimeFormat that supports it. You can use Intl.DateTimeFormat' +
            ' if it\'s supported by your environment. https://github.com/andyearnshaw/Intl.js is a good polyfill.',
          },
          {
            name: 'wordings',
            type: 'object',
            header: 'default: {ok: \'OK\', cancel: \'Cancel\' }',
            desc: 'Wordings used inside the button of the dialog.',
          },
          {
            name: 'autoOk',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, automatically accept and close the picker on select a date.',
          },
          {
            name: 'defaultDate',
            type: 'date object',
            header: 'optional',
            desc: 'This is the initial date value of the component. If either `value` or `valueLink` ' +
            'is provided they will override this prop with `value` taking precedence.',
          },
          {
            name: 'disableYearSelection',
            type: 'bool',
            header: 'optional',
            desc: 'If true, year selection will be disabled, otherwise, year selection will be enabled.',
          },
          {
            name: 'floatingLabelText',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the floating label element.',
          },
          {
            name: 'formatDate',
            type: 'function',
            header: 'default: formats to M/D/YYYY',
            desc: 'This function is called to format the date to display in ' +
              'the input box. By default, date objects are formatted to M/D/YYYY.',
          },
          {
            name: 'hintText',
            type: 'string',
            header: 'optional',
            desc: 'The hint text string to display. Note, floatingLabelText will overide this.',
          },
          {
            name: 'maxDate',
            type: 'date object',
            header: 'optional',
            desc: 'The ending of a range of valid dates. The range includes the endDate. ' +
              'The default value is current date + 100 years.',
          },
          {
            name: 'minDate',
            type: 'date object',
            header: 'optional',
            desc: 'The beginning of a range of valid dates. The range includes the startDate. ' +
              'The default value is current date - 100 years.',
          },
          {
            name: 'mode',
            type: 'one of: portrait, landscape',
            header: 'default: portrait',
            desc: 'Tells the component to display the picker in portrait or landscape mode.',
          },
          {
            name: 'shouldDisableDate',
            type: 'function',
            header: 'optional',
            desc: 'Called during render time of a given day. If this method returns false ' +
              'the day is disabled otherwise it is displayed normally.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of DatePicker\'s root element.',
          },
          {
            name: 'textFieldStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of DatePicker\'s TextField element.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getDate',
            header: 'DatePicker.getDate()',
            desc: 'Returns the current date value.',
          },
          {
            name: 'setDate',
            header: 'DatePicker.setDate(d)',
            desc: 'Sets the date value to d, where d is a date object.',
          },
          {
            name: 'openDialog',
            header: 'DatePicker.openDialog()',
            desc: 'Opens the date-picker dialog programmatically. Use this if you want to open the ' +
            'dialog in response to some event other than focus/tap on the input field, such as an ' +
            'external button click.',
          },
          {
            name: 'focus',
            header: 'DatePicker.focus()',
            desc: 'An alias for the `openDialog()` method to allow more generic use alongside `TextField`.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(nill, date)',
            desc: 'Callback function that is fired when the date value ' +
            'changes. Since there is no particular event associated with ' +
            'the change the first argument will always be null and the second ' +
            'argument will be the new Date instance.',
          },
          {
            name: 'onDismiss',
            header: 'function()',
            desc: 'Fired when the datepicker dialog is dismissed.',
          },
          {
            name: 'onFocus',
            header: 'function(event)',
            desc: 'Callback function that is fired when the datepicker field ' +
            'gains focus.',
          },
          {
            name: 'onShow',
            header: 'function()',
            desc: 'Fired when the datepicker dialog is shown.',
          },
        ],
      },
    ];

    let optionsStyle = {
      width: '300px',
      margin: '0 auto',
    };

    return (
      <ComponentDoc
        name="Date Picker"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statements:\nconst DatePicker = require(\'material-ui/lib/date-picker/date-picker\');\n' +
            'const DatePickerDialog = require(\'material-ui/lib/date-picker/date-picker-dialog\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <DatePicker
            hintText="Portrait Dialog" />

          <DatePicker
            hintText="Landscape Dialog"
            mode="landscape" />

          <DatePicker
            hintText="Controlled Date Input"
            value={this.state.controlledDate}
            onChange={this._handleChange.bind(this)} />

          <DatePicker
            hintText="Ranged Date Picker"
            autoOk={this.state.autoOk}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            showYearSelector={this.state.showYearSelector} />

          <DatePicker
            hintText="fr version"
            DateTimeFormat={Intl.DateTimeFormat}
            // Intl is defined by the browser see http://caniuse.com/#search=intl
            wordings={{ok: 'OK', cancel: 'Annuler'}}
            locale="fr" />

          <div style={optionsStyle}>
            <TextField
              floatingLabelText="Min Date"
              defaultValue={this.state.minDate.toDateString()}
              onChange={this._updateMinDate.bind(this)} />

            <TextField
              floatingLabelText="Max Date"
              defaultValue={this.state.maxDate.toDateString()}
              onChange={this._updateMaxDate.bind(this)} />

            <Toggle
              name="autoOk"
              value="autoOk"
              label="Auto Accept"
              defaultToggled={this.state.autoOk}
              onToggle={this._handleToggle.bind(this)} />

            <Toggle
              name="disableYearSelection"
              value="disableYearSelection"
              label="Disable Year Selection"
              defaultToggled={this.state.disableYearSelection}
              onToggle={this._handleToggle.bind(this)} />
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  }

  _updateMinDate(e) {
    this.setState({
      minDate: new Date(e.target.value),
    });
  }

  _updateMaxDate(e) {
    this.setState({
      maxDate: new Date(e.target.value),
    });
  }

  _handleToggle(e, toggled) {
    let state = {};
    state[e.target.name] = toggled;
    this.setState(state);
  }

  _handleChange(nill, date) {
    this.setState({controlledDate: date});
  }
}
