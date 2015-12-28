import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class DatePickerExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  render() {
    return (
        <DatePicker
          hintText="Controlled Date Input"
          value={this.state.controlledDate}
          onChange={this._handleChange} />
    );
  }

  _handleChange = (e, date) => {
    this.setState({controlledDate: date});
  }
}

export default DatePickerExampleControlled;
