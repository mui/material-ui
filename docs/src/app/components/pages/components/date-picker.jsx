let React = require('react');
let { DatePicker, TextField, Toggle } = require('material-ui');
let ComponentDoc = require('../../component-doc');


class DatePickerPage extends React.Component {
  constructor(props) {
    super(props);

    let minDate = new Date();
    let maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() -1);
    minDate.setHours(0,0,0,0);
    maxDate.setFullYear(maxDate.getFullYear() +1);
    maxDate.setHours(0,0,0,0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      showYearSelector: false
    };
  }

  render() {

    let code =
      '//Portrait Dialog\n' +
      '<DatePicker\n' +
      '  hintText="Portrait Dialog"\n\n' +
      '//Landscape Dialog\n' +
      '<DatePicker\n' +
      '  hintText="Landscape Dialog"\n' +
      '  mode="landscape"/>\n\n'+
      '// Ranged Date Picker\n' +
      '<DatePicker\n' +
      '  hintText="Ranged Date Picker"\n' +
      '  autoOk={this.state.autoOk}\n' +
      '  minDate={this.state.minDate}\n' +
      '  maxDate={this.state.maxDate}\n' +
      '  showYearSelector={this.state.showYearSelector} />';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'autoOk',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, automatically accept and close the picker on select a date.'
          },
          {
            name: 'defaultDate',
            type: 'date object',
            header: 'optional',
            desc: 'This is the initial date value of the component.'
          },
          {
            name: 'formatDate',
            type: 'function',
            header: 'default: formats to M/D/YYYY',
            desc: 'This function is called to format the date to display in ' +
              'the input box. By default, date objects are formatted to M/D/YYYY.'
          },
          {
            name: 'hideToolbarYearChange',
            type: 'boolean',
            header: 'optional',
            desc: 'Hide year change buttons on calendar; good for short time spans. Clicking ' +
              'the year will always result in selecting a year.'
          },
          {
            name: 'maxDate',
            type: 'date object',
            header: 'optional',
            desc: 'The ending of a range of valid dates. The range includes the endDate. ' +
              'The default value is current date + 100 years.'
          },
          {
            name: 'minDate',
            type: 'date object',
            header: 'optional',
            desc: 'The beginning of a range of valid dates. The range includes the startDate. ' +
              'The default value is current date - 100 years.'
          },
          {
            name: 'mode',
            type: 'one of: portrait, landscape',
            header: 'default: portrait',
            desc: 'Tells the component to display the picker in portrait or landscape mode.'
          },
          {
            name: 'shouldDisableDate',
            type: 'function',
            header: 'optional',
            desc: 'Called during render time of a given day. If this method returns false ' +
              'the day is disabled otherwise it is displayed normally.'
          },
          {
            name: 'showYearSelector',
            type: 'boolean',
            header: 'default: false',
            desc: 'Determines whether or not a DatePicker has a year selection capability. ' +
              'If false, the year change buttons in the toolbar are hidden.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of DatePicker\'s root element.'
          },
          {
            name: 'textFieldStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of DatePicker\'s TextField element.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getDate',
            header: 'DatePicker.getDate()',
            desc: 'Returns the current date value.'
          },
          {
            name: 'setDate',
            header: 'DatePicker.setDate(d)',
            desc: 'Sets the date value to d, where d is a date object.'
          }
        ]
      }
    ];

    let optionsStyle = {
      width: '300px',
      margin: '0 auto'
    };

    return (
      <ComponentDoc
        name="Date Picker"
        code={code}
        componentInfo={componentInfo}>

        <DatePicker
          hintText="Portrait Dialog" />

        <DatePicker
          hintText="Landscape Dialog"
          mode="landscape" />

        <DatePicker
          hintText="Ranged Date Picker"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          showYearSelector={this.state.showYearSelector} />

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
              name="showYearSelector"
              value="showYearSelector"
              label="Show Year Selector"
              defaultToggled={this.state.showYearSelector}
              onToggle={this._handleToggle.bind(this)} />
        </div>
      </ComponentDoc>
    );
  }

  _updateMinDate(e) {
    this.setState({
      minDate: new Date(e.target.value)
    });
  }

  _updateMaxDate(e) {
    this.setState({
      maxDate: new Date(e.target.value)
    });
  }

  _handleToggle(e, toggled) {
    let state = {};
    state[e.target.name] = toggled;
    this.setState(state);
  }

}

module.exports = DatePickerPage;
