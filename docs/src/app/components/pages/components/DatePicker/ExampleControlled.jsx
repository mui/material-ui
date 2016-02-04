import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class DatePickerExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  _handleChange = (date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <DatePicker
        hintText="Controlled Date Input"
        value={this.state.controlledDate}
        onChangeDate={this._handleChange}
      />
    );
  }
}
