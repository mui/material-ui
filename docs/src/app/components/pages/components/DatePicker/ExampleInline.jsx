import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class DatePickerExampleInline extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  render() {
    return (
      <div>
        <DatePicker
          hintText="Inline"
          container="inline" />
        <DatePicker
          hintText="Inline (AutoOk)"
          container="inline"
          autoOk={true} />
        <DatePicker
          hintText="Controlled Date Input"
          value={this.state.controlledDate}
          onChange={this._handleChange} />
      </div>
    );
  }

  _handleChange = (e, date) => {
    this.setState({controlledDate: date});
  }
}

export default DatePickerExampleInline;
