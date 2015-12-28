import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

const optionsStyle = {
  width: 300,
  margin: '0 auto',
};

export default class DatePickerExampleToggle extends React.Component {

  constructor(props) {
    super(props);

    let minDate = new Date();
    let maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
    };
  }

  render() {
    return (
      <div>

        <DatePicker
          hintText="Ranged Date Picker"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          disableYearSelection={this.state.disableYearSelection} />


        <div style={optionsStyle}>
          <TextField
            floatingLabelText="Min Date"
            defaultValue={this.state.minDate.toDateString()}
            onChange={this._updateMinDate} />

          <TextField
            floatingLabelText="Max Date"
            defaultValue={this.state.maxDate.toDateString()}
            onChange={this._updateMaxDate} />

          <Toggle
            name="autoOk"
            value="autoOk"
            label="Auto Accept"
            defaultToggled={this.state.autoOk}
            onToggle={this._handleToggle} />

          <Toggle
            name="disableYearSelection"
            value="disableYearSelection"
            label="Disable Year Selection"
            defaultToggled={this.state.disableYearSelection}
            onToggle={this._handleToggle} />
        </div>
      </div>
    );
  }

  _updateMinDate = (event) => {
    this.setState({
      minDate: new Date(event.target.value),
    });
  }

  _updateMaxDate = (event) => {
    this.setState({
      maxDate: new Date(event.target.value),
    });
  }

  _handleToggle = (event, toggled) => {
    let state = {};
    state[event.target.name] = toggled;
    this.setState(state);
  }
}

export default DatePickerExampleToggle;
