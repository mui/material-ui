import React from 'react';
import {DateRangePicker} from 'material-ui/DatePicker';

/**
 * `DateRangePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class DateRangePickerExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <DateRangePicker
        hintText="Controlled Date Input"
        value={this.state.controlledDate}
        onChange={this.handleChange}
      />
    );
  }
}
